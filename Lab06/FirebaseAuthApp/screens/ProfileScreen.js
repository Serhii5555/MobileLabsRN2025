import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        Alert.alert("Помилка", "Профіль не знайдено");
      }
    } catch (error) {
      Alert.alert("Помилка", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert("Помилка", error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>Профіль не знайдено</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ваш профіль</Text>
      <Text style={styles.item}>Ім’я: {profile.name}</Text>
      <Text style={styles.item}>Вік: {profile.age}</Text>
      <Text style={styles.item}>Місто: {profile.city}</Text>
      <Text style={styles.item}>Email: {profile.email}</Text>

      <Button
        title="Редагувати профіль"
        onPress={() => navigation.navigate("EditProfile", { profile })}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Вийти з акаунта" color="red" onPress={handleLogout} />
      </View>

      <Button
        title="Видалити акаунт"
        color="darkred"
        onPress={() => navigation.navigate("DeleteAccount")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: 16,
  },
  item: {
    fontSize: 18,
    marginBottom: 8,
  },
});
