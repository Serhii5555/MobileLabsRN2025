import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

import StoreScreen from "../screens/StoreScreen";
import CommunityScreen from "../screens/CommunityScreen";
import ChatScreen from "../screens/ChatScreen";
import SafetyScreen from "../screens/SafetyScreen";
import ProfileScreen from "../screens/ProfileScreen";

const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Store" component={StoreScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Safety" component={SafetyScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
