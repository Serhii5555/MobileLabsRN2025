import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.details}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price} грн</Text>
      </View>

      <View style={styles.actionSection}>
        <TextInput
          style={styles.qtyInput}
          keyboardType="number-pad"
          value={String(item.quantity)}
          onChangeText={(val) => onQuantityChange(item.id, val)}
        />
        <TouchableOpacity
          onPress={() => onRemove(item.id)}
          style={styles.deleteBtn}
        >
          <Text style={styles.deleteBtnText}>Видалити</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    elevation: 3,
  },
  details: {
    flex: 1,
  },
  productTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222222",
  },
  productPrice: {
    marginTop: 6,
    color: "#888888",
  },
  actionSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyInput: {
    width: 55,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bbb",
    fontSize: 17,
    marginRight: 14,
    textAlign: "center",
  },
  deleteBtn: {
    backgroundColor: "#D32F2F",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  deleteBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});

export default CartItem;
