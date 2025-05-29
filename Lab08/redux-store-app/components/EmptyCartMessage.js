import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyCartMessage = () => {
  return (
    <View style={styles.messageWrapper}>
      <Text style={styles.messageText}>Кошик порожній</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  messageText: {
    fontSize: 18,
    color: "#888888",
    fontStyle: "italic",
  },
});

export default EmptyCartMessage;
