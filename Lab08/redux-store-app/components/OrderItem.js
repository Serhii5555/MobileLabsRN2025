import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderItem = ({ order }) => {
  const getTotalPrice = (items) =>
    items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2);

  return (
    <View style={styles.container}>
      <Text>Дата замовлення: {new Date(order.date).toLocaleDateString()}</Text>
      <Text>Товарів у замовленні: {order.items.length}</Text>
      <Text>Загальна сума: {getTotalPrice(order.items)} грн</Text>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
});
