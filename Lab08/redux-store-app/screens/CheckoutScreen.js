import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import { addOrder } from "../store/slices/ordersSlice";
import { useNavigation } from "@react-navigation/native";

import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";

const CheckoutScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const validateEmailFormat = (mail) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(mail.trim());
  };

  const handleOrderSubmission = () => {
    if (name.trim() === "") {
      Alert.alert("Помилка", "Будь ласка, введіть ім'я");
      return;
    }

    if (!validateEmailFormat(email)) {
      Alert.alert("Помилка", "Будь ласка, введіть коректний email");
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert("Помилка", "Кошик порожній");
      return;
    }

    const order = {
      id: Date.now().toString(),
      name,
      email,
      items: cartItems,
      createdAt: new Date().toISOString(),
    };

    dispatch(addOrder(order));
    dispatch(clearCart());

    Alert.alert("Успіх", "Замовлення успішно оформлено!", [
      {
        text: "Гаразд",
        onPress: () => navigation.navigate("Каталог"),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Text style={styles.title}>Оформлення замовлення</Text>
        <FormInput placeholder="Ім'я" value={name} onChangeText={setName} />
        <FormInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <PrimaryButton title="Підтвердити" onPress={handleOrderSubmission} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fefefe",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 32,
    textAlign: "center",
    color: "#111",
  },
});

export default CheckoutScreen;
