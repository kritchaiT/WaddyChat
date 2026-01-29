import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";
import { currentUser } from "@/data/mockData";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  color?: string;
}

const menuItems: MenuItem[] = [
  { id: "wallet", icon: "credit-card", label: "My Wallet" },
  { id: "rewards", icon: "gift", label: "Rewards" },
  { id: "favorites", icon: "heart", label: "Favorites" },
  { id: "orders", icon: "shopping-bag", label: "Orders" },
];

const settingsItems: MenuItem[] = [
  { id: "settings", icon: "settings", label: "Settings" },
  { id: "help", icon: "help-circle", label: "Help Center" },
  { id: "about", icon: "info", label: "About" },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const handleSettings = () => {
    Haptics.selectionAsync();
    navigation.navigate("Settings");
  };

  const handleMenuItem = (item: MenuItem) => {
    Haptics.selectionAsync();
    if (item.id === "settings") {
      navigation.navigate("Settings");
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.lg,
        paddingBottom: tabBarHeight + Spacing.xl,
      }}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.profileCard, { backgroundColor: theme.backgroundDefault }]}>
        <Image
          source={currentUser.avatar}
          style={styles.avatar}
          contentFit="cover"
        />
        <View style={styles.profileInfo}>
          <ThemedText type="h3">{currentUser.name}</ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {currentUser.username}
          </ThemedText>
        </View>
        <Pressable onPress={handleSettings} style={styles.editIcon}>
          <Feather name="chevron-right" size={20} color={theme.textTertiary} />
        </Pressable>
      </View>

      <View style={[styles.menuCard, { backgroundColor: theme.backgroundDefault }]}>
        {menuItems.map((item, index) => (
          <Pressable
            key={item.id}
            testID={`menu-${item.id}`}
            onPress={() => handleMenuItem(item)}
            style={[
              styles.menuItem,
              index < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border },
            ]}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: Colors.light.primary + "15" }]}>
              <Feather name={item.icon as any} size={20} color={Colors.light.primary} />
            </View>
            <ThemedText type="body" style={styles.menuLabel}>{item.label}</ThemedText>
            <Feather name="chevron-right" size={18} color={theme.textTertiary} />
          </Pressable>
        ))}
      </View>

      <View style={[styles.menuCard, { backgroundColor: theme.backgroundDefault }]}>
        {settingsItems.map((item, index) => (
          <Pressable
            key={item.id}
            testID={`menu-${item.id}`}
            onPress={() => handleMenuItem(item)}
            style={[
              styles.menuItem,
              index < settingsItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.border },
            ]}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: theme.backgroundTertiary }]}>
              <Feather name={item.icon as any} size={20} color={theme.textSecondary} />
            </View>
            <ThemedText type="body" style={styles.menuLabel}>{item.label}</ThemedText>
            <Feather name="chevron-right" size={18} color={theme.textTertiary} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  editIcon: {
    padding: Spacing.sm,
  },
  menuCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    flex: 1,
    marginLeft: Spacing.md,
  },
});
