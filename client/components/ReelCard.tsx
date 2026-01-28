import React, { useState } from "react";
import { StyleSheet, View, Pressable, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { Spacing, Colors } from "@/constants/theme";
import type { Reel } from "@/data/mockData";

interface ReelCardProps {
  reel: Reel;
  isActive?: boolean;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ReelCard({ reel, isActive = false }: ReelCardProps) {
  const [isLiked, setIsLiked] = useState(reel.isLiked);
  const [likesCount, setLikesCount] = useState(reel.likes);
  const heartScale = useSharedValue(1);

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    heartScale.value = withSequence(
      withSpring(1.4, { damping: 5 }),
      withSpring(1, { damping: 10 })
    );
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <View style={styles.container}>
      <Image
        source={reel.thumbnail}
        style={styles.video}
        contentFit="cover"
      />

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.6)"]}
        style={styles.gradient}
      />

      <View style={styles.overlay}>
        <View style={styles.userInfo}>
          <Image source={reel.userAvatar} style={styles.avatar} contentFit="cover" />
          <ThemedText type="h4" style={styles.whiteText}>
            {reel.username}
          </ThemedText>
        </View>
        <ThemedText type="body" style={[styles.whiteText, styles.caption]} numberOfLines={2}>
          {reel.caption}
        </ThemedText>
      </View>

      <View style={styles.actions}>
        <AnimatedPressable
          testID={`reel-like-${reel.id}`}
          onPress={handleLike}
          style={[styles.actionButton, heartAnimatedStyle]}
        >
          <Feather
            name="heart"
            size={28}
            color={isLiked ? Colors.light.secondary : "#FFFFFF"}
          />
          <ThemedText type="small" style={styles.actionText}>
            {formatNumber(likesCount)}
          </ThemedText>
        </AnimatedPressable>

        <Pressable style={styles.actionButton}>
          <Feather name="message-circle" size={28} color="#FFFFFF" />
          <ThemedText type="small" style={styles.actionText}>
            {formatNumber(reel.comments)}
          </ThemedText>
        </Pressable>

        <Pressable style={styles.actionButton}>
          <Feather name="share" size={28} color="#FFFFFF" />
          <ThemedText type="small" style={styles.actionText}>
            {formatNumber(reel.shares)}
          </ThemedText>
        </Pressable>
      </View>

      {isActive ? (
        <View style={styles.playButton}>
          <Feather name="play" size={48} color="rgba(255,255,255,0.8)" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
  },
  overlay: {
    position: "absolute",
    left: Spacing.lg,
    right: 80,
    bottom: 120,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Spacing.sm,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  whiteText: {
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  caption: {
    marginTop: Spacing.xs,
  },
  actions: {
    position: "absolute",
    right: Spacing.lg,
    bottom: 140,
    alignItems: "center",
  },
  actionButton: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  actionText: {
    color: "#FFFFFF",
    marginTop: Spacing.xs,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -24 }, { translateY: -24 }],
    opacity: 0.8,
  },
});
