import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { deleteProductAsync } from "../store/slices/productsSlice";

const ProductItem = ({ id, title, price, imageUrl, description }) => {
  const dispatch = useDispatch();

  const addProductToCart = () => {
    dispatch(addToCart({ id, title, price }));
  };

  const confirmProductDeletion = () => {
    Alert.alert(
      "Підтвердження видалення",
      `Ви дійсно хочете видалити "${title}"?`,
      [
        { text: "Відміна", style: "cancel" },
        {
          text: "Видалити",
          style: "destructive",
          onPress: () => dispatch(deleteProductAsync(id)),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.productImage} />
      <View style={styles.infoWrapper}>
        <Text style={styles.productTitle}>{title}</Text>
        {description ? (
          <Text style={styles.productDescription}>{description}</Text>
        ) : null}
        <Text style={styles.productPrice}>{price} грн</Text>

        <TouchableOpacity style={styles.addButton} onPress={addProductToCart}>
          <Text style={styles.addButtonText}>Додати в кошик</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={confirmProductDeletion}
        >
          <Text style={styles.removeButtonText}>Видалити</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: "#222",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  productImage: {
    width: 110,
    height: 110,
  },
  infoWrapper: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  productTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },
  productDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
  },
  productPrice: {
    fontSize: 15,
    color: "#888",
    marginTop: 7,
  },
  addButton: {
    marginTop: 12,
    backgroundColor: "#005BBB",
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  removeButton: {
    marginTop: 9,
    backgroundColor: "#D93025",
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});

export default ProductItem;
