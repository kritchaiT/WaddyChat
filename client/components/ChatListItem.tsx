import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";
import type { Chat } from "@/data/mockData";

interface ChatListItemProps {
  chat: Chat;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ChatListItem({ chat, onPress }: ChatListItemProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue("transparent");

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: backgroundColor.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15 });
    backgroundColor.value = theme.backgroundTertiary;
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    backgroundColor.value = "transparent";
  };

  const handlePress = () => {
    Haptics.selectionAsync();
    onPress();
  };

  return (
    <AnimatedPressable
      testID={`chat-item-${chat.id}`}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, animatedStyle]}
    >
      <View style={styles.avatarContainer}>
        <Image source={chat.avatar} style={styles.avatar} contentFit="cover" />
        {chat.isOnline ? (
          <View style={[styles.onlineIndicator, { borderColor: theme.backgroundDefault }]} />
        ) : null}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="h4" style={styles.name} numberOfLines={1}>
            {chat.name}
          </ThemedText>
          <ThemedText
            type="small"
            style={{ color: theme.textTertiary }}
          >
            {chat.timestamp}
          </ThemedText>
        </View>
        <View style={styles.messageRow}>
          <ThemedText
            type="body"
            style={{ color: theme.textSecondary, flex: 1 }}
            numberOfLines={1}
          >
            {chat.lastMessage}
          </ThemedText>
          {chat.unreadCount > 0 ? (
            <View style={styles.unreadBadge}>
              <ThemedText type="small" style={styles.unreadText}>
                {chat.unreadCount}
              </ThemedText>
            </View>
          ) : null}
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: "transparent", // Clean look
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.light.success,
    borderWidth: 2,
  },
  content: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  unreadBadge: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: Spacing.sm,
  },
  unreadText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
