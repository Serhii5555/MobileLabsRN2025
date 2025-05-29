import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slices/userSlice";

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await dispatch(registerUser(email, password, name));
    } catch (err) {
      Alert.alert(
        "Помилка реєстрації",
        err.response?.data?.error?.message || err.message || "Сталася помилка"
      );
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ім’я користувача</Text>
      <TextInput
        style={styles.input}
        placeholder="Введіть ім’я користувача"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Електронна пошта</Text>
      <TextInput
        style={styles.input}
        placeholder="Введіть email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Пароль (не менше 6 символів)</Text>
      <TextInput
        style={styles.input}
        placeholder="Введіть пароль"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.buttonArea}>
        <Button title="Створити акаунт" onPress={handleSignup} />
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 24,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 17,
  },
  buttonArea: {
    marginTop: 18,
  },
});
