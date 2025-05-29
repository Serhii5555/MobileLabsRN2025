import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserProfileCard = ({ user }) => {
  if (!user) {
    return <Text style={styles.noticeText}>Дані користувача відсутні.</Text>;
  }

  return (
    <View style={styles.cardWrapper}>
      <Text style={styles.label}>Ім’я:</Text>
      <Text style={styles.info}>{user.name || "Не вказано"}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.info}>{user.email}</Text>
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 22,
    marginVertical: 30,
    elevation: 8,
    shadowColor: "#222",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#555",
    marginTop: 14,
  },
  info: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
    marginTop: 5,
  },
  noticeText: {
    fontSize: 16,
    color: "#999",
    alignSelf: "center",
    marginVertical: 30,
  },
});
