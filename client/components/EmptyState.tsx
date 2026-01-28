import React from "react";
import { StyleSheet, View, ImageSourcePropType } from "react-native";
import { Image } from "expo-image";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

interface EmptyStateProps {
  image: ImageSourcePropType;
  title: string;
  description?: string;
}

export function EmptyState({ image, title, description }: EmptyStateProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} contentFit="contain" />
      <ThemedText type="h3" style={styles.title}>
        {title}
      </ThemedText>
      {description ? (
        <ThemedText type="body" style={[styles.description, { color: theme.textSecondary }]}>
          {description}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing["3xl"],
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: Spacing.xl,
  },
  title: {
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  description: {
    textAlign: "center",
  },
});
