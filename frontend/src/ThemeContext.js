import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    // Try to use system preference
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggle = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <div style={{
        background: dark
          ? " linear-gradient(120deg,rgb(9, 12, 19) 0%,rgb(1, 1, 2) 100%)"
          : "linear-gradient(120deg, #f0f4ff 0%, #dbeafe 100%)",
        minHeight: "100vh",
        color: dark ? " #fff" : " #111",
        transition: "background 0.3s,color 0.3s"
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
