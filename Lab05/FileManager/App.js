import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Device from "expo-device";
import { Platform } from "react-native";

export default function App() {
  const [currentPath, setCurrentPath] = useState("");
  const [rootPath, setRootPath] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createType, setCreateType] = useState("folder");
  const [newItemName, setNewItemName] = useState("");
  const [newFileContent, setNewFileContent] = useState("");
  const [fileViewerVisible, setFileViewerVisible] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [fileInfoVisible, setFileInfoVisible] = useState(false);
  const [selectedFileInfo, setSelectedFileInfo] = useState(null);
  const [storageStats, setStorageStats] = useState({
    totalSpace: 0,
    freeSpace: 0,
    usedSpace: 0,
  });

  useEffect(() => {
    setupFilesystem();
    getStorageStats();
  }, []);

  const setupFilesystem = async () => {
    try {
      const documentDir = FileSystem.documentDirectory;
      const appDataPath = documentDir + "AppData";

      const appDataInfo = await FileSystem.getInfoAsync(appDataPath);
      if (!appDataInfo.exists) {
        await FileSystem.makeDirectoryAsync(appDataPath);
      }

      setRootPath(appDataPath);
      setCurrentPath(appDataPath);
      await loadFiles(appDataPath);
    } catch (error) {
      console.error("Setup filesystem error:", error);
      Alert.alert("Error", "Failed to setup filesystem");
    }
  };

  const getStorageStats = async () => {
    try {
      if (Platform.OS === "android") {
        const freeBytes = await FileSystem.getFreeDiskStorageAsync();
        const totalBytes = await FileSystem.getTotalDiskCapacityAsync();
        const usedBytes = totalBytes - freeBytes;

        setStorageStats({
          totalSpace: formatBytes(totalBytes),
          freeSpace: formatBytes(freeBytes),
          usedSpace: formatBytes(usedBytes),
        });
      } else {
        const appDirInfo = await FileSystem.getInfoAsync(
          FileSystem.documentDirectory,
          { size: true }
        );
        setStorageStats({
          totalSpace: "Unknown (iOS limitation)",
          freeSpace: "Unknown (iOS limitation)",
          usedSpace: formatBytes(appDirInfo.size || 0),
        });
      }
    } catch (error) {
      console.error("Get storage stats error:", error);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const loadFiles = async (path) => {
    setLoading(true);
    try {
      const files = await FileSystem.readDirectoryAsync(path);

      const fileDetailsPromises = files.map(async (fileName) => {
        const fileUri = `${path}/${fileName}`;
        const fileInfo = await FileSystem.getInfoAsync(fileUri, { size: true });
        return {
          name: fileName,
          uri: fileUri,
          isDirectory: fileInfo.isDirectory,
          size: fileInfo.size,
          modificationTime: fileInfo.modificationTime,
          ...fileInfo,
        };
      });

      const fileDetails = await Promise.all(fileDetailsPromises);

      const sortedFiles = fileDetails.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });

      setFiles(sortedFiles);
    } catch (error) {
      console.error("Load files error:", error);
      Alert.alert("Error", "Failed to load files");
    } finally {
      setLoading(false);
    }
  };

  const navigateToDirectory = (dirPath) => {
    setCurrentPath(dirPath);
    loadFiles(dirPath);
  };

  const navigateUp = () => {
    if (currentPath === rootPath) return;

    const parentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
    navigateToDirectory(parentPath);
  };

  const openCreateModal = (type) => {
    setCreateType(type);
    setNewItemName("");
    setNewFileContent("");
    setCreateModalVisible(true);
  };

  const handleCreate = async () => {
    if (!newItemName.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    try {
      const newPath = `${currentPath}/${newItemName}`;

      if (createType === "folder") {
        await FileSystem.makeDirectoryAsync(newPath);
      } else {
        const extension = newItemName.endsWith(".txt") ? "" : ".txt";
        await FileSystem.writeAsStringAsync(
          `${currentPath}/${newItemName}${extension}`,
          newFileContent
        );
      }

      setCreateModalVisible(false);
      loadFiles(currentPath);
    } catch (error) {
      console.error("Create error:", error);
      Alert.alert("Error", `Failed to create ${createType}`);
    }
  };

  const openFile = async (file) => {
    if (file.isDirectory) {
      navigateToDirectory(file.uri);
      return;
    }

    try {
      if (file.name.endsWith(".txt")) {
        const content = await FileSystem.readAsStringAsync(file.uri);
        setCurrentFile(file);
        setFileContent(content);
        setIsEditing(false);
        setFileViewerVisible(true);
      } else {
        Alert.alert(
          "Unsupported File",
          "This file type is not supported for viewing"
        );
      }
    } catch (error) {
      console.error("Open file error:", error);
      Alert.alert("Error", "Failed to open file");
    }
  };

  const saveFileChanges = async () => {
    try {
      await FileSystem.writeAsStringAsync(currentFile.uri, fileContent);
      setIsEditing(false);
      Alert.alert("Success", "File saved successfully");
      loadFiles(currentPath);
    } catch (error) {
      console.error("Save file error:", error);
      Alert.alert("Error", "Failed to save file");
    }
  };

  const confirmDelete = (file) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete ${file.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteItem(file),
        },
      ]
    );
  };

  const deleteItem = async (file) => {
    try {
      if (file.isDirectory) {
        await FileSystem.deleteAsync(file.uri, { idempotent: true });
      } else {
        await FileSystem.deleteAsync(file.uri);
      }
      loadFiles(currentPath);
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", "Failed to delete item");
    }
  };

  const showFileInfo = (file) => {
    setSelectedFileInfo(file);
    setFileInfoVisible(true);
  };

  const getFileType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    return extension || "Unknown";
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown";
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const renderFileItem = ({ item }) => (
    <View style={styles.fileItem}>
      <TouchableOpacity
        style={styles.fileButton}
        onPress={() => openFile(item)}
      >
        <Ionicons
          name={item.isDirectory ? "folder" : "document-text"}
          size={24}
          color={item.isDirectory ? "#FFC107" : "#2196F3"}
        />
        <Text style={styles.fileName}>{item.name}</Text>
      </TouchableOpacity>

      <View style={styles.fileActions}>
        <TouchableOpacity onPress={() => showFileInfo(item)}>
          <Ionicons name="information-circle" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmDelete(item)}>
          <Ionicons name="trash" size={24} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderBreadcrumb = () => {
    if (!rootPath || !currentPath) return null;

    let relativePath = currentPath.replace(rootPath, "");
    if (relativePath === "") {
      return <Text style={styles.breadcrumb}>Home</Text>;
    }

    if (relativePath.startsWith("/")) {
      relativePath = relativePath.substring(1);
    }

    const pathParts = ["Home", ...relativePath.split("/")];

    return <Text style={styles.breadcrumb}>{pathParts.join(" / ")}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>File Manager</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Storage Statistics:</Text>
        <Text>Total Space: {storageStats.totalSpace}</Text>
        <Text>Free Space: {storageStats.freeSpace}</Text>
        <Text>Used Space: {storageStats.usedSpace}</Text>
      </View>

      <View style={styles.breadcrumbContainer}>{renderBreadcrumb()}</View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <FlatList
            data={files}
            renderItem={renderFileItem}
            keyExtractor={(item) => item.uri}
            style={styles.fileList}
          />

          <View style={styles.buttonBar}>
            {currentPath !== rootPath && (
              <TouchableOpacity style={styles.button} onPress={navigateUp}>
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text style={styles.buttonText}>Up</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() => openCreateModal("folder")}
            >
              <Ionicons name="folder-open" size={24} color="white" />
              <Text style={styles.buttonText}>New Folder</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => openCreateModal("file")}
            >
              <Ionicons name="create" size={24} color="white" />
              <Text style={styles.buttonText}>New File</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Modal
        visible={createModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {createType === "folder"
                ? "Create New Folder"
                : "Create New Text File"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder={`Enter ${createType} name`}
              value={newItemName}
              onChangeText={setNewItemName}
            />

            {createType === "file" && (
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter file content"
                value={newFileContent}
                onChangeText={setNewFileContent}
                multiline
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setCreateModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.createButton]}
                onPress={handleCreate}
              >
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={fileViewerVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {currentFile?.name || ""} {isEditing ? "(Editing)" : ""}
            </Text>

            <TextInput
              style={[styles.input, styles.textArea]}
              value={fileContent}
              onChangeText={setFileContent}
              multiline
              editable={isEditing}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setFileViewerVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>

              {isEditing ? (
                <TouchableOpacity
                  style={[styles.button, styles.createButton]}
                  onPress={saveFileChanges}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.button, styles.createButton]}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={fileInfoVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>File Information</Text>

            {selectedFileInfo && (
              <View style={styles.fileInfoContainer}>
                <Text style={styles.fileInfoRow}>
                  <Text style={styles.fileInfoLabel}>Name: </Text>
                  {selectedFileInfo.name}
                </Text>
                <Text style={styles.fileInfoRow}>
                  <Text style={styles.fileInfoLabel}>Type: </Text>
                  {selectedFileInfo.isDirectory
                    ? "Folder"
                    : getFileType(selectedFileInfo.name)}
                </Text>
                <Text style={styles.fileInfoRow}>
                  <Text style={styles.fileInfoLabel}>Size: </Text>
                  {formatBytes(selectedFileInfo.size || 0)}
                </Text>
                <Text style={styles.fileInfoRow}>
                  <Text style={styles.fileInfoLabel}>Modified: </Text>
                  {formatDate(selectedFileInfo.modificationTime)}
                </Text>
                <Text style={styles.fileInfoRow}>
                  <Text style={styles.fileInfoLabel}>Path: </Text>
                  {selectedFileInfo.uri}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                { alignSelf: "center", marginTop: 20 },
              ]}
              onPress={() => setFileInfoVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#3498db",
    padding: 15,
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  statsContainer: {
    padding: 10,
    backgroundColor: "#e8f5e9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  statsTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  breadcrumbContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  breadcrumb: {
    fontSize: 16,
  },
  fileList: {
    flex: 1,
  },
  fileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "white",
  },
  fileButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  fileName: {
    marginLeft: 10,
    fontSize: 16,
  },
  fileActions: {
    flexDirection: "row",
    width: 80,
    justifyContent: "space-between",
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 150,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cancelButton: {
    backgroundColor: "#9e9e9e",
  },
  createButton: {
    backgroundColor: "#4CAF50",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fileInfoContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 5,
  },
  fileInfoRow: {
    marginBottom: 8,
  },
  fileInfoLabel: {
    fontWeight: "bold",
  },
});
