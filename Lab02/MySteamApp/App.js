import React from "react";
import {
  useFonts,
  ABeeZee_400Regular,
  ABeeZee_400Regular_Italic,
} from "@expo-google-fonts/abeezee";
import AppLoading from "expo-app-loading";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import AppNavigator from "./navigation/AppNavigator";

const App = () => {
  let [fontsLoaded] = useFonts({
    ABeeZee: ABeeZee_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProviderWrapper>
      <AppNavigator />
    </ThemeProviderWrapper>
  );
};

export default App;
