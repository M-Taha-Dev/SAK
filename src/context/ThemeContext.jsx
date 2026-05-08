import { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    localStorage.removeItem("sak-theme");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "light", toggle: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
