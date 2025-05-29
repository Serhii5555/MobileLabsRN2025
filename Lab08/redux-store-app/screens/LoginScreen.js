import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/userSlice";

const LoginScreen = ({ navigation }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const dispatch = useDispatch();

  const attemptLogin = async () => {
    try {
      await dispatch(loginUser(emailInput, passwordInput));
    } catch (err) {
      const errorMsg =
        err?.response?.data?.error?.message ||
        err.message ||
        "Щось пішло не так";
      Alert.alert("Помилка входу", errorMsg);
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.inputField}
        value={emailInput}
        onChangeText={setEmailInput}
        placeholder="Введіть email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Пароль</Text>
      <TextInput
        style={styles.inputField}
        value={passwordInput}
        onChangeText={setPasswordInput}
        placeholder="Введіть пароль"
        secureTextEntry
      />

      <Pressable style={styles.loginBtn} onPress={attemptLogin}>
        <Text style={styles.loginBtnText}>Увійти</Text>
      </Pressable>

      <View style={styles.signupSection}>
        <Text style={styles.infoText}>Не маєте акаунт? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signupLink}>Реєстрація</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 28,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    marginLeft: 4,
    color: "#222222",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    color: "#111111",
  },
  loginBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  signupSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#555555",
  },
  signupLink: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
});
