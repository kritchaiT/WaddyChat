import React from "react";
import { StyleSheet, View, Pressable, Dimensions } from "react-native";
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
import type { NewsItem } from "@/data/mockData";

interface NewsCardProps {
  news: NewsItem;
  onPress?: () => void;
  isFirst?: boolean;
}

import { Utils, useWindowDimensions } from "react-native";
// ... imports

// Remove fixed width constants
// const { width: SCREEN_WIDTH } = Dimensions.get("window");
// const CARD_WIDTH = SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md;
// const FIRST_CARD_WIDTH = SCREEN_WIDTH - Spacing.lg * 2;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function NewsCard({ news, onPress, isFirst }: NewsCardProps) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const scale = useSharedValue(1);

  // Calculate widths dynamically
  const cardWidth = width - Spacing.lg * 2 - Spacing.md;
  const firstCardWidth = width - Spacing.lg * 2;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const handlePress = () => {
    Haptics.selectionAsync();
    onPress?.();
  };

  if (isFirst) {
    return (
      <AnimatedPressable
        testID={`news-${news.id}`}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.featuredContainer,
          {
            backgroundColor: theme.backgroundDefault,
            borderColor: theme.border,
            width: firstCardWidth
          },
          animatedStyle,
        ]}
      >
        <Image source={news.image} style={styles.featuredImage} contentFit="cover" />
        <View style={styles.featuredContent}>
          <View style={[styles.categoryBadge, { backgroundColor: Colors.light.primary + "20" }]}>
            <ThemedText type="small" style={{ color: Colors.light.primary, fontWeight: "600" }}>
              {news.category}
            </ThemedText>
          </View>
          <ThemedText type="h3" style={styles.featuredTitle} numberOfLines={2}>
            {news.title}
          </ThemedText>
          <ThemedText type="body" style={{ color: theme.textSecondary }} numberOfLines={2}>
            {news.summary}
          </ThemedText>
          <ThemedText type="small" style={{ color: theme.textTertiary, marginTop: Spacing.sm }}>
            {news.timestamp}
          </ThemedText>
        </View>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      testID={`news-${news.id}`}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundDefault,
          borderColor: theme.border,
          width: cardWidth
        },
        animatedStyle,
      ]}
    >
      <Image source={news.image} style={styles.image} contentFit="cover" />
      <View style={styles.content}>
        <View style={[styles.categoryBadge, { backgroundColor: Colors.light.primary + "20" }]}>
          <ThemedText type="small" style={{ color: Colors.light.primary, fontWeight: "600" }}>
            {news.category}
          </ThemedText>
        </View>
        <ThemedText type="h4" numberOfLines={2} style={styles.title}>
          {news.title}
        </ThemedText>
        <ThemedText type="small" style={{ color: theme.textTertiary }}>
          {news.timestamp}
        </ThemedText>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    overflow: "hidden",
    marginRight: Spacing.md,
  },
  image: {
    width: "100%",
    height: 120,
  },
  content: {
    padding: Spacing.md,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.xs,
  },
  title: {
    marginBottom: Spacing.xs,
  },
  featuredContainer: {
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: Spacing.lg,
  },
  featuredImage: {
    width: "100%",
    height: 180,
  },
  featuredContent: {
    padding: Spacing.lg,
  },
  featuredTitle: {
    marginBottom: Spacing.sm,
  },
});
