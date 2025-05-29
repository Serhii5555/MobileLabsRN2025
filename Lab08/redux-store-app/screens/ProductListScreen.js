import React, { useEffect } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../store/slices/productsSlice";

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const productsState = useSelector((state) => state.products);
  const products = productsState.list;
  const loadingStatus = productsState.loading;

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      dispatch(fetchProducts());
    });

    return () => {
      focusListener();
    };
  }, [navigation, dispatch]);

  if (loadingStatus) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(product) => product.id}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            description={item.description}
          />
        )}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  listPadding: {
    paddingVertical: 10,
  },
});
