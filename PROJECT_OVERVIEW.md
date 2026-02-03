# Waddy Chat - Project Overview & Developer Guide

**Date:** February 4, 2026
**Version:** 1.0 (Demo Phase)

## 1. Introduction
Welcome to **Waddy Chat**, a React Native mobile application built with Expo. This project aims to replicate the premium, polished feel of top-tier messaging apps like **LINE** and **WeChat**, featuring a clean "Green" aesthetic, real-time messaging capabilities (currently mocked for demo), and a social profile feed.

This document serves as a comprehensive guide for **Fullstack Developers** and **UI/UX Designers** to understand the codebase, navigation flow, and current architectural decisions.

---

## 2. Technology Stack

*   **Framework:** [React Native](https://reactnative.dev/) (via [Expo](https://expo.dev/))
*   **Language:** TypeScript
*   **Navigation:** React Navigation (Stack & Bottom Tabs)
*   **Styling:** StyleSheet (React Native default) with a custom Theme System
*   **UI Components:** `react-native-reanimated` (Animations), `expo-image` (Performance), `expo-vector-icons`
*   **Backend (Planned):** Supabase (PostgreSQL + Realtime)
    *   *Note: Currently running in "Demo Mode" with local state to ensure stability.*
*   **State Management:** React Context (for Theme) + Local State (`useState`)

---

## 3. Project Structure
The source code is contained primarily in the `client/` directory.

```text
Waddy-App/
├── app.json                # Expo configuration (Splash screen, Bundle IDs)
├── package.json            # Dependencies and scripts
└── client/
    ├── App.tsx             # Application Entry Point
    ├── index.js            # App Registry
    ├── components/         # Reusable UI Blocks (Atoms/Molecules)
    ├── constants/          # Static Values (Colors, Layouts)
    ├── data/               # Mock Data for Demo
    ├── hooks/              # Custom Logic Re-use
    ├── lib/                # External Service Config (Supabase)
    ├── navigation/         # Navigation Configuration
    └── screens/            # Full Page Views
```

---

## 4. Key Directories & File Explanations

### 🟢 **/client/screens/** (The Pages)
These are the main screens the user interacts with.

*   **`LoginScreen.tsx`**
    *   **Purpose:** Initial entry point. Handles user authentication.
    *   **Logic:** Currently uses `AsyncStorage` to simulate a login session. No real backend check yet.
    *   **UI:** Simple, clean vertical layout with a "Log In" button.

*   **`ChatListScreen.tsx`** (Tab 1)
    *   **Purpose:** Shows the list of active conversations (like WhatsApp/Line home).
    *   **Logic:** Renders a `FlatList` of `ChatListItem` components using data from `mockMessages`.

*   **`ChatDetailScreen.tsx`**
    *   **Purpose:** The core messaging interface.
    *   **Features:**
        *   **Messaging:** Bubble interface (`MessageBubble`).
        *   **Attachments:** "+" button opens menu for Photos (`expo-image-picker`) and Files (`expo-document-picker`).
        *   **Demo Mode:** Uses **Optimistic UI** to show sent messages instantly. Backend calls are currently mocked to prevent errors.
    *   **Key Code:** `handleSend` (logic for appending messages), `pickImage` (attachment logic).

*   **`ProfileScreen.tsx`** (Tab 4)
    *   **Purpose:** User's personal social profile (Instagram/Line Voom style).
    *   **Features:**
        *   **Header:** Avatar, Followers count, Bio.
        *   **Tabs:** Dynamic switching between "Posts" (Grid), "Reels", and "Tagged".
        *   **Grid System:** Custom 3-column grid layout for photos using `useWindowDimensions` for responsiveness.

*   **`SettingsScreen.tsx`**
    *   **Purpose:** App configuration.
    *   **Features:** Dark Mode toggle. Uses `useTheme` hook to change global colors.

### 🟢 **/client/navigation/** (The Flow)
How users move through the app.

*   **`RootStackNavigator.tsx`**
    *   **Type:** Native Stack Navigator
    *   **Role:** The "Parent" navigator. It handles the transition from `Login` -> `Main` (Tabs) -> `ChatDetail` (Stack Screen).
    *   **Why:** We want `ChatDetail` to cover the bottom tabs, so it sits *on top* of the Tab Navigator in the stack.

*   **`MainTabNavigator.tsx`**
    *   **Type:** Bottom Tab Navigator
    *   **Role:** The main dashboard. Contains: `Eras` (Chats), `Calls`, `News`, `Profile`.
    *   **UI:** Custom Tab Bar styling to match the Theme.

### 🟢 **/client/components/** (The Building Blocks)
Reusable styled components.

*   **`ThemedText.tsx`**: A Text component that automatically changes color based on Dark/Light mode. Use this instead of the raw `<Text>` component.
*   **`ChatListItem.tsx`**: A single row in the chat list. Displays avatar, name, last message, and unread badge.
*   **`MessageBubble.tsx`**: The chat bubble. Logic determines if it’s "My Message" (Green, Right) or "Their Message" (White, Left).
*   **`NewsCard.tsx` / `ReelCard.tsx`**: Cards used in the social feeds.

### 🟢 **/client/constants/** & **/client/hooks/** (The Style System)

*   **`theme.ts`**: **CRITICAL FOR UI**. Defines the Color Palette (`Colors.light` vs `Colors.dark`).
    *   *Designers:* Change hex codes here to update the entire app's look.
*   **`useTheme.ts`**: A hook that returns the current theme's colors.
    *   *Usage:* `const { theme } = useTheme();` -> `<View style={{ backgroundColor: theme.background }} />`

---

## 5. Backend Status (Supabase)

The file `client/lib/supabase.ts` controls the backend connection.

*   **Current State:** **MOCKED / DISABLED**.
*   **Reason:** To provide a stable "Demo Build" without requiring valid API keys or dependency resolution issues during the handover.
*   **How to Enable:**
    1.  Uncomment code in `client/lib/supabase.ts`.
    2.  Add valid `SUPABASE_URL` and `SUPABASE_KEY`.
    3.  Uncomment the `useEffect` logic in `ChatDetailScreen.tsx` to enable real-time subscriptions.

---

## 6. How to Run

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start the Metro Bundler:**
    ```bash
    npx expo start
    ```
3.  **Run on Device:** Scan the QR code with Expo Go (Android) or Camera (iOS).

## 7. Future Roadmap / To-Do
*   **Backend Re-connection:** Restore real Supabase calls for production.
*   **Auth Flow:** Replace mock login with Supabase Auth (Email/Phone).
*   **Media Uploads:** Connect `pickImage` logic to Supabase Storage buckets.
