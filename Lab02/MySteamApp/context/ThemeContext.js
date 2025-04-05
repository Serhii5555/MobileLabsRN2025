import React, { createContext, useState, useContext } from "react";
import { ThemeProvider } from "styled-components/native";
import SegmentedControl from "../components/SegmentedControl";

const lightTheme = {
  navigator_icon_active: "#000",
  navigator_icon_inactive: "#738399",
  navigator: "#DEDEDE",
  background: "#FFF",
  text: "#000",
  text_secondary: "#738399",
  primary_color: "#999FB7",
  secondary_color: "#7FD6FE",
  segmented_control: "#A8AEC0",
  unread_badge: "#CFCFCF",
  chat_message_color: "#586570",
};

const darkTheme = {
  navigator_icon_active: "#FFF",
  navigator_icon_inactive: "#4B5664",
  navigator: "#12141C",
  background: "#1C202C",
  text: "#FFF",
  text_secondary: "#4B5664",
  primary_color: "#303649",
  secondary_color: "#31BCFC",
  segmented_control: "#303649",
  unread_badge: "#FFFFFF",
  chat_message_color: "#7B8D9D",
};

const ThemeContext = createContext();

export const useTheme = () => {
  const { theme: themeName, toggleTheme } = useContext(ThemeContext);
  const theme = themeName === "light" ? lightTheme : darkTheme;
  return { theme, toggleTheme };
};

export const ThemeProviderWrapper = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
