import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "../context/ThemeContext"; // Import useTheme

const Tab = createBottomTabNavigator();

import StoreScreen from "../screens/StoreScreen";
import CommunityScreen from "../screens/CommunityScreen";
import ChatScreen from "../screens/ChatScreen";
import SafetyScreen from "../screens/SafetyScreen";
import ProfileScreen from "../screens/ProfileScreen";

const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.navigator,
            borderTopWidth: 0,
            height: 60,
            paddingTop: 10,
          },
          tabBarActiveTintColor: theme.navigator_icon_active,
          tabBarInactiveTintColor: theme.navigator_icon_inactive,
        }}
      >
        <Tab.Screen
          name="Store"
          component={StoreScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="shopping-bag" size={size} color={color} />
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="users" size={size} color={color} />
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="message-circle" size={size} color={color} />
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="Safety"
          component={SafetyScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="shield" size={size} color={color} />
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" size={size} color={color} />
            ),
            tabBarLabel: () => null,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
