import React, { useEffect, useState, useContext } from "react";
import { View, Button, FlatList, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";
import { AuthContext } from "../AuthContext";

const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { logout } = useContext(AuthContext);

  const fetchPosts = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const res = await api.get(`/users/${userId}/posts.json`);
    const data = res.data
      ? Object.entries(res.data).map(([id, post]) => ({ id, ...post }))
      : [];
    setPosts(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchPosts);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button
          title="Create Post"
          onPress={() => navigation.navigate("CreatePost")}
        />
        <Button title="Logout" color="red" onPress={logout} />
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.post}>{item.text}</Text>}
        ListEmptyComponent={<Text style={styles.empty}>No posts yet.</Text>}
      />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  post: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  empty: { textAlign: "center", marginTop: 50, fontStyle: "italic" },
});
