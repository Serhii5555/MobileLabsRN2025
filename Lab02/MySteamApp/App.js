import React from "react";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import AppNavigator from "./navigation/AppNavigator";

const App = () => (
  <ThemeProviderWrapper>
    <AppNavigator />
  </ThemeProviderWrapper>
);

export default App;
