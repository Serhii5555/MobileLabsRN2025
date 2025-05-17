import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function EditProfileScreen({ route, navigation }) {
  const { profile } = route.params;
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [city, setCity] = useState(profile.city);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name || !age || !city) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі поля");
      return;
    }

    try {
      setLoading(true);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name,
        age,
        city,
      });
      Alert.alert("Успіх", "Профіль оновлено");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Помилка", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Редагування профілю</Text>

      <TextInput
        placeholder="Ім’я"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Вік"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Місто"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <Button
        title={loading ? "Збереження..." : "Зберегти зміни"}
        onPress={handleUpdate}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
  },
});
