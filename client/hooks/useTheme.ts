import { useContext } from "react";
import { ThemeContext } from "@/constants/ThemeContext";
import { Colors } from "@/constants/theme";

export function useTheme() {
  const { theme, toggleTheme, setTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const colors = Colors[theme];

  return {
    theme: colors,
    isDark,
    toggleTheme,
    setTheme,
    themeType: theme,
  };
}
