/**
 * ThemeContext — Global dark/light theme state
 *
 * Provides `theme` ("dark" | "light") and `toggleTheme()`.
 * Persists choice in localStorage so it survives reloads.
 * DEFAULT is now "light" ("The Parchment Ledger").
 */
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export function ThemeProvider({ children }) {
    // Default is "light" — change this line to "dark" if you ever want dark as default
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem("portfolio-theme") || "light";
        } catch {
            return "light";
        }
    });

    // Sync the "light" class on <html> and persist preference
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "light") {
            root.classList.add("light");
        } else {
            root.classList.remove("light");
        }
        try {
            localStorage.setItem("portfolio-theme", theme);
        } catch {
            /* localStorage unavailable — silent */
        }
    }, [theme]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

/** Hook — use anywhere to read or toggle theme */
export function useTheme() {
    return useContext(ThemeContext);
}