import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const CartFooter = ({ total, onCheckout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.totalAmount}>Всього: {total.toFixed(2)} грн</Text>
      <Pressable
        style={styles.button}
        onPress={onCheckout}
        android_ripple={{ color: "#005BBB" }}
      >
        <Text style={styles.buttonText}>Оформити замовлення</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ffffff",
    borderTopColor: "#cccccc",
    borderTopWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 14,
    color: "#222222",
  },
  button: {
    backgroundColor: "#0066FF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 28,
    elevation: 2,
  },
  buttonText: {
    color: "#fafafa",
    fontWeight: "700",
    fontSize: 17,
  },
});

export default CartFooter;
