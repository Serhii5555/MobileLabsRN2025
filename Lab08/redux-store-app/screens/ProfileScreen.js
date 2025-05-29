import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";
import UserCard from "../components/UserCard";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const signOut = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профіль</Text>

      <UserCard user={userInfo} />

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={signOut}
      >
        <Text style={styles.buttonText}>Вийти</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Історія замовлень")}
      >
        <Text style={styles.buttonText}>Переглянути історію замовлень</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: "#B71C1C",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
