import React, { useState } from "react";
import { StyleSheet, View, Pressable, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";
import type { Post } from "@/data/mockData";

interface PostCardProps {
  post: Post;
  onPress?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_WIDTH = SCREEN_WIDTH - Spacing.lg * 2;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.75;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PostCard({ post, onPress }: PostCardProps) {
  const { theme } = useTheme();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const heartScale = useSharedValue(1);

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    heartScale.value = withSequence(
      withSpring(1.3, { damping: 5 }),
      withSpring(1, { damping: 10 })
    );
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundDefault, borderColor: theme.border }]}>
      <View style={styles.header}>
        <Image source={post.userAvatar} style={styles.avatar} contentFit="cover" />
        <View style={styles.userInfo}>
          <ThemedText type="h4">{post.username}</ThemedText>
          <ThemedText type="small" style={{ color: theme.textTertiary }}>
            {post.timestamp}
          </ThemedText>
        </View>
      </View>

      <Pressable onPress={onPress}>
        <Image
          source={post.image}
          style={styles.postImage}
          contentFit="cover"
        />
      </Pressable>

      <View style={styles.actions}>
        <AnimatedPressable
          testID={`like-button-${post.id}`}
          onPress={handleLike}
          style={[styles.actionButton, heartAnimatedStyle]}
        >
          <Feather
            name={isLiked ? "heart" : "heart"}
            size={24}
            color={isLiked ? Colors.light.secondary : theme.text}
            style={isLiked ? { fill: Colors.light.secondary } : undefined}
          />
          <ThemedText type="body" style={styles.actionText}>
            {formatNumber(likesCount)}
          </ThemedText>
        </AnimatedPressable>

        <Pressable testID={`comment-button-${post.id}`} style={styles.actionButton}>
          <Feather name="message-circle" size={24} color={theme.text} />
          <ThemedText type="body" style={styles.actionText}>
            {formatNumber(post.comments)}
          </ThemedText>
        </Pressable>

        <Pressable style={styles.actionButton}>
          <Feather name="share" size={24} color={theme.text} />
        </Pressable>
      </View>

      <View style={styles.captionContainer}>
        <ThemedText type="body">
          <ThemedText type="h4">{post.username} </ThemedText>
          {post.caption}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: Spacing.sm,
  },
  postImage: {
    width: "100%",
    height: IMAGE_HEIGHT,
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Spacing.lg,
    padding: Spacing.xs,
  },
  actionText: {
    marginLeft: Spacing.xs,
  },
  captionContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
});
