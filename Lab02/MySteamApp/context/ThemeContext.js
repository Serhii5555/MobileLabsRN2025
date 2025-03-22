import React, { createContext, useState, useContext } from "react";
import { ThemeProvider } from "styled-components/native";

const lightTheme = {
  background: "#fff",
  text: "#000",
  primary_color: "#303649",
  secondary_color: "#31BCFC",
};

const darkTheme = {
  background: "#20242c",
  text: "#fff",
  primary_color: "#303649",
  secondary_color: "#31BCFC",
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
