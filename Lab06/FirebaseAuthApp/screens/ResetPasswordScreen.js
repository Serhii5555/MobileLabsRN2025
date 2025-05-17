import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Помилка", "Введіть email");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Перевірте пошту",
        `На ${email} відправлено лист із посиланням для відновлення пароля.`
      );
      navigation.goBack();
    } catch (error) {
      // Можна більш тонко обробляти різні коди помилок:
      // 'auth/user-not-found', 'auth/invalid-email' тощо.
      Alert.alert("Помилка", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Відновлення пароля</Text>
      <Text style={styles.instruction}>
        Введіть ваш email — ми пришлемо вам посилання для скидання пароля.
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Button
        title={loading ? "Відправка..." : "Відправити лист"}
        onPress={handleReset}
        disabled={loading}
      />

      <Text style={styles.link} onPress={() => navigation.goBack()}>
        Повернутись до входу
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: 12,
    textAlign: "center",
  },
  instruction: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
  },
  link: {
    marginTop: 20,
    color: "blue",
    textAlign: "center",
  },
});
