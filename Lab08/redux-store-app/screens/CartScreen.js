import React from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { removeFromCart, changeQuantity } from "../store/slices/cartSlice";

import CartItem from "../components/CartItem";
import CartFooter from "../components/CartFooter";
import EmptyCartMessage from "../components/EmptyCartMessage";

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cartTotal = cartItems
    .map((product) => product.price * product.quantity)
    .reduce((acc, curr) => acc + curr, 0);

  const updateQuantity = (itemId, newQty) => {
    const parsedQty = Number(newQty);
    if (!parsedQty || parsedQty <= 0) {
      Alert.alert("Помилка", "Кількість має бути числом більше 0");
      return;
    }
    dispatch(changeQuantity({ id: itemId, quantity: parsedQty }));
  };

  const deleteItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const goToCheckout = () => {
    navigation.navigate("Checkout");
  };

  return (
    <View style={styles.screen}>
      {cartItems.length === 0 ? (
        <EmptyCartMessage />
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listPadding}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onQuantityChange={updateQuantity}
                onRemove={deleteItem}
              />
            )}
          />
          <CartFooter total={cartTotal} onCheckout={goToCheckout} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: "#fafafa",
  },
  listPadding: {
    paddingBottom: 100,
  },
});

export default CartScreen;
