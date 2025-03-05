import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./HomeScreen";
import PhotoGallery from "./PhotoGallery";
import RegistrationForm from "./RegistrationForm";

const Tab = createMaterialTopTabNavigator();

const PlaceholderScreen = ({ name }) => (
  <View style={styles.placeholderScreen}>
    <Text>{name}</Text>
  </View>
);

const CustomHeader = () => {
  return (
    <View style={styles.header}>
      <Image source={require("./logo.png")} style={styles.logo} />

      <Text style={styles.headerTitle}>FirstMobileApp</Text>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Головна") iconName = "home";
          else if (route.name === "Фотогалерея") iconName = "images";
          else if (route.name === "Профіль") iconName = "person";
          return <Ionicons name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Головна" component={HomeScreen} />
      <Tab.Screen name="Фотогалерея" component={PhotoGallery} />
      <Tab.Screen name="Профіль" component={RegistrationForm} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <CustomHeader />
        <View style={styles.content}>
          <TabNavigator />
        </View>
        <Text style={styles.footer}>Бейлах Сергій Валерійович, ІПЗ-23-3</Text>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 10,
  },
  logo: {
    width: 120,
    height: 70,
    resizeMode: "contain",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  content: {
    flex: 1,
  },
  footer: {
    textAlign: "center",
    padding: 10,
    fontSize: 12,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  placeholderScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
