import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function ScoreCounter({ score }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Очки: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 20 },
  text: { fontSize: 24 },
});
