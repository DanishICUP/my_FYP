import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext('light');

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("AdminTheme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("AdminTheme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("AdminTheme", "light")
    }
  }, [darkMode]);
  
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useDarkMode = () => useContext(ThemeContext)
