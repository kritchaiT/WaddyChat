import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";

interface SettingItemProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  onPress?: () => void;
  isDestructive?: boolean;
}

function SettingItem({ icon, title, onPress, isDestructive }: SettingItemProps) {
  const { theme } = useTheme();

  const handlePress = () => {
    Haptics.selectionAsync();
    onPress?.();
  };

  return (
    <Pressable
      testID={`setting-${title.toLowerCase().replace(/\s/g, "-")}`}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.settingItem,
        {
          backgroundColor: pressed ? theme.backgroundTertiary : theme.backgroundDefault,
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isDestructive
              ? Colors.light.error + "20"
              : Colors.light.primary + "20",
          },
        ]}
      >
        <Feather
          name={icon}
          size={20}
          color={isDestructive ? Colors.light.error : Colors.light.primary}
        />
      </View>
      <ThemedText
        type="body"
        style={[styles.settingTitle, isDestructive && { color: Colors.light.error }]}
      >
        {title}
      </ThemedText>
      <Feather name="chevron-right" size={20} color={theme.textTertiary} />
    </Pressable>
  );
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: Spacing.xl,
        paddingBottom: insets.bottom + Spacing.xl,
        paddingHorizontal: Spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      <ThemedText
        type="small"
        style={[styles.sectionTitle, { color: theme.textSecondary }]}
      >
        ACCOUNT
      </ThemedText>
      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <SettingItem icon="user" title="Edit Profile" />
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <SettingItem icon="lock" title="Privacy" />
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <SettingItem icon="shield" title="Security" />
      </View>

      <ThemedText
        type="small"
        style={[styles.sectionTitle, { color: theme.textSecondary }]}
      >
        NOTIFICATIONS
      </ThemedText>
      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <SettingItem icon="bell" title="Push Notifications" />
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <SettingItem icon="mail" title="Email Notifications" />
      </View>

      <ThemedText
        type="small"
        style={[styles.sectionTitle, { color: theme.textSecondary }]}
      >
        APPEARANCE
      </ThemedText>
      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <SettingItem icon="moon" title="Dark Mode" />
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <SettingItem icon="type" title="Text Size" />
      </View>

      <ThemedText
        type="small"
        style={[styles.sectionTitle, { color: theme.textSecondary }]}
      >
        SUPPORT
      </ThemedText>
      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <SettingItem icon="help-circle" title="Help Center" />
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <SettingItem icon="message-square" title="Contact Us" />
      </View>

      <View style={styles.dangerZone}>
        <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
          <SettingItem icon="log-out" title="Log Out" isDestructive />
        </View>
      </View>

      <ThemedText
        type="small"
        style={[styles.version, { color: theme.textTertiary }]}
      >
        Version 1.0.0
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
    marginLeft: Spacing.sm,
    marginTop: Spacing.xl,
    fontWeight: "600",
    letterSpacing: 1,
  },
  section: {
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  settingTitle: {
    flex: 1,
  },
  divider: {
    height: 1,
    marginLeft: Spacing.lg + 36 + Spacing.md,
  },
  dangerZone: {
    marginTop: Spacing["3xl"],
  },
  version: {
    textAlign: "center",
    marginTop: Spacing["2xl"],
  },
});
