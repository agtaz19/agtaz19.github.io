/**
 * ThemeToggle — Precision sliding switch for dark/light mode
 *
 * Accepts a `transparent` prop — when true (hero top), renders
 * with white styling to stay visible against the dark hero overlay.
 *
 * The knob slides smoothly with a cubic-bezier spring curve.
 */
import React from "react";
import { useTheme } from "@/lib/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ transparent = false }) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="relative flex items-center w-14 h-7 rounded-full cursor-pointer
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                       transition-colors duration-300"
            style={{
                backgroundColor: transparent ? "rgba(255,255,255,0.12)" : "rgba(var(--bg-secondary), 1)",
                border: "1px solid rgba(212,175,55,0.4)",
            }}
        >
            {/* Sliding knob — always gold */}
            <span
                className="absolute top-0.5 flex items-center justify-center w-6 h-6 rounded-full
                           shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                    left: isDark ? "2px" : "calc(100% - 26px)",
                    backgroundColor: "rgb(212,175,55)",
                }}
            >
                {isDark
                    ? <Moon size={12} style={{ color: "#000" }} />
                    : <Sun  size={12} style={{ color: "#fff" }} />
                }
            </span>
        </button>
    );
}