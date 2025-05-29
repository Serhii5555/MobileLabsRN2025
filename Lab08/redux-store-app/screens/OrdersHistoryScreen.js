import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../components/OrderItem";

const OrderHistoryScreen = () => {
  const orders = useSelector((state) => state.orders.history);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Історія замовлень</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>Немає замовлень</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(order) => order.id}
          renderItem={({ item }) => <OrderItem order={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ddd",
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  noOrdersText: {
    marginTop: 50,
    fontSize: 18,
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default OrderHistoryScreen;
