import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProductListScreen from "../screens/ProductListScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import OrdersHistoryScreen from "../screens/OrdersHistoryScreen";

const NativeStack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const AuthenticationStack = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Вхід" }}
      />
      <NativeStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Реєстрація" }}
      />
    </NativeStack.Navigator>
  );
};

const CatalogStack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="Каталог" component={ProductListScreen} />
  </NativeStack.Navigator>
);

const UserProfileStack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen
      name="Профіль"
      component={ProfileScreen}
      options={{ title: "Обліковий запис" }}
    />
    <NativeStack.Screen
      name="Історія замовлень"
      component={OrdersHistoryScreen}
      options={{ title: "Історія замовлень" }}
    />
  </NativeStack.Navigator>
);

const ShoppingCartStack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen
      name="Кошик"
      component={CartScreen}
      options={{ title: "Товари кошику" }}
    />
    <NativeStack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{ title: "Оформлення замовлення" }}
    />
  </NativeStack.Navigator>
);

const MainTabs = () => (
  <BottomTabs.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "dodgerblue",
      tabBarInactiveTintColor: "dimgray",
      tabBarIcon: ({ focused, color, size }) => {
        let icon;

        switch (route.name) {
          case "Каталог":
            icon = focused ? "list-circle" : "list-circle-outline";
            break;
          case "Кошик":
            icon = focused ? "cart" : "cart-outline";
            break;
          case "Профіль":
            icon = focused ? "person-circle" : "person-circle-outline";
            break;
          default:
            icon = "ellipse";
        }

        return <Ionicons name={icon} size={size} color={color} />;
      },
    })}
  >
    <BottomTabs.Screen name="Каталог" component={CatalogStack} />
    <BottomTabs.Screen name="Кошик" component={ShoppingCartStack} />
    <BottomTabs.Screen name="Профіль" component={UserProfileStack} />
  </BottomTabs.Navigator>
);

const AppNavigator = () => {
  const token = useSelector((state) => state.user.idToken);

  return (
    <NavigationContainer>
      {token ? <MainTabs /> : <AuthenticationStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
