import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#111111",
    textSecondary: "#888888",
    textTertiary: "#B2B2B2",
    buttonText: "#FFFFFF",
    tabIconDefault: "#999999",
    tabIconSelected: "#07C160", // WeChat Green
    link: "#07C160",
    primary: "#07C160",
    primaryDark: "#06AD56",
    secondary: "#F2F2F2",
    backgroundRoot: "#EDEDED", // WeChat typical background
    backgroundDefault: "#FFFFFF",
    backgroundSecondary: "#F5F5F5",
    backgroundTertiary: "#E0E0E0",
    border: "#DCDCDC",
    success: "#07C160",
    error: "#FA5151",
    overlay: "rgba(0, 0, 0, 0.5)",
  },
  dark: {
    text: "#F2F2F2",
    textSecondary: "#7A7A7A",
    textTertiary: "#555555",
    buttonText: "#191919",
    tabIconDefault: "#7A7A7A",
    tabIconSelected: "#07C160",
    link: "#07C160",
    primary: "#07C160",
    primaryDark: "#06AD56",
    secondary: "#2A2A2A",
    backgroundRoot: "#191919", // Dark mode background
    backgroundDefault: "#000000", // Or very dark grey
    backgroundSecondary: "#232323",
    backgroundTertiary: "#2C2C2C",
    border: "#333333",
    success: "#07C160",
    error: "#FA5151",
    overlay: "rgba(0, 0, 0, 0.7)",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
  fabSize: 56,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  hero: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700" as const,
    fontFamily: "Nunito_700Bold",
  },
  h1: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700" as const,
    fontFamily: "Nunito_700Bold",
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700" as const,
    fontFamily: "Nunito_700Bold",
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600" as const,
    fontFamily: "Nunito_700Bold",
  },
  h4: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600" as const,
    fontFamily: "Nunito_700Bold",
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400" as const,
    fontFamily: "Nunito_400Regular",
  },
  bodyLarge: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "400" as const,
    fontFamily: "Nunito_400Regular",
  },
  small: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400" as const,
    fontFamily: "Nunito_400Regular",
  },
  button: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600" as const,
    fontFamily: "Nunito_700Bold",
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
    fontFamily: "Nunito_400Regular",
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "Nunito_400Regular",
    bold: "Nunito_700Bold",
  },
  default: {
    sans: "Nunito_400Regular",
    bold: "Nunito_700Bold",
  },
  web: {
    sans: "Nunito_400Regular, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    bold: "Nunito_700Bold, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
});

export const Shadows = {
  fab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
};
