import React, { createContext, useState, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from "./theme";

type ThemeContextType = {
  currentTheme: "light" | "dark";
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <StyledThemeProvider
        theme={currentTheme === "light" ? theme.light : theme.dark}
      >
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
