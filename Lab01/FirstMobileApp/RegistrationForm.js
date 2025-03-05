import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleSubmit = () => {
    if (!email || !password || !confirmPassword || !lastName || !firstName) {
      Alert.alert("Будь ласка, заповніть всі поля.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Паролі не співпадають.");
      return;
    }

    Alert.alert("Вітаємо!", "Ви успішно зареєстровані.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Електронна пошта</Text>
        <TextInput
          style={styles.input}
          placeholder="Введіть електронну пошту"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Пароль</Text>
        <TextInput
          style={styles.input}
          placeholder="Введіть пароль"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Пароль (ще раз)</Text>
        <TextInput
          style={styles.input}
          placeholder="Повторіть пароль"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Text style={styles.label}>Прізвище</Text>
        <TextInput
          style={styles.input}
          placeholder="Введіть прізвище"
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>Ім'я</Text>
        <TextInput
          style={styles.input}
          placeholder="Введіть ім'я"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Зареєструватись</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default RegistrationForm;
