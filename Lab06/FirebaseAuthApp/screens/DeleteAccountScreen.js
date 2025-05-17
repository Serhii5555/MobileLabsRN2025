import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function DeleteAccountScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!password) {
      Alert.alert("Помилка", "Введіть пароль");
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      setLoading(true);

      // Повторна автентифікація
      await reauthenticateWithCredential(user, credential);

      // Видалення профілю з Firestore
      await deleteDoc(doc(db, "users", user.uid));

      // Видалення користувача з Authentication
      await deleteUser(user);

      Alert.alert("Успіх", "Акаунт видалено");
    } catch (error) {
      Alert.alert("Помилка", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Видалення акаунта</Text>
      <Text style={styles.warning}>
        Цю дію неможливо скасувати. Ви впевнені?
      </Text>

      <TextInput
        placeholder="Підтвердіть пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Button
        title={loading ? "Видалення..." : "Видалити акаунт"}
        color="darkred"
        onPress={handleDelete}
        disabled={loading}
      />

      <Button title="Скасувати" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: 16,
    textAlign: "center",
  },
  warning: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
});
