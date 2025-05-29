import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const PrimaryButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0066FF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
});

export default PrimaryButton;
