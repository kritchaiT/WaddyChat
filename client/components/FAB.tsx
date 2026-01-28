import React from "react";
import { StyleSheet, Pressable, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Colors, Spacing, Shadows } from "@/constants/theme";

interface FABProps {
  onPress: () => void;
  icon?: keyof typeof Feather.glyphMap;
  style?: ViewStyle;
  testID?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function FAB({ onPress, icon = "plus", style, testID }: FABProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <AnimatedPressable
      testID={testID}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, animatedStyle, style]}
    >
      <LinearGradient
        colors={[Colors.light.primary, Colors.light.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Feather name={icon} size={24} color="#FFFFFF" />
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Spacing.fabSize,
    height: Spacing.fabSize,
    borderRadius: Spacing.fabSize / 2,
    ...Shadows.fab,
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: Spacing.fabSize / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
