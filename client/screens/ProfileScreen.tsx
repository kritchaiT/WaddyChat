import React from "react";
import { View, StyleSheet, ScrollView, Pressable, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";
import { currentUser, mockPosts } from "@/data/mockData";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GRID_GAP = 2;
const GRID_ITEM_SIZE = (SCREEN_WIDTH - Spacing.lg * 2 - GRID_GAP * 2) / 3;

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

  const handleEditProfile = () => {
    Haptics.selectionAsync();
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
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: tabBarHeight + Spacing.xl,
      }}
      scrollIndicatorInsets={{ bottom: insets.bottom }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Image
          source={currentUser.avatar}
          style={styles.avatar}
          contentFit="cover"
        />
        <ThemedText type="h2" style={styles.name}>
          {currentUser.name}
        </ThemedText>
        <ThemedText type="body" style={{ color: theme.textSecondary }}>
          {currentUser.username}
        </ThemedText>
        <ThemedText type="body" style={[styles.bio, { color: theme.textSecondary }]}>
          {currentUser.bio}
        </ThemedText>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <ThemedText type="h3">{currentUser.postsCount}</ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Posts
          </ThemedText>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
        <View style={styles.statItem}>
          <ThemedText type="h3">{formatNumber(currentUser.followersCount)}</ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Followers
          </ThemedText>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
        <View style={styles.statItem}>
          <ThemedText type="h3">{formatNumber(currentUser.followingCount)}</ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            Following
          </ThemedText>
        </View>
      </View>

      <View style={styles.actions}>
        <Button onPress={handleEditProfile} style={styles.editButton}>
          Edit Profile
        </Button>
        <Pressable
          testID="settings-button"
          onPress={handleSettings}
          style={[styles.settingsButton, { backgroundColor: theme.backgroundDefault }]}
        >
          <Feather name="settings" size={20} color={theme.text} />
        </Pressable>
      </View>

      <View style={styles.grid}>
        {mockPosts.map((post) => (
          <Pressable key={post.id} style={styles.gridItem}>
            <Image
              source={post.image}
              style={styles.gridImage}
              contentFit="cover"
            />
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
  header: {
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: Spacing.lg,
  },
  name: {
    marginBottom: Spacing.xs,
  },
  bio: {
    textAlign: "center",
    marginTop: Spacing.md,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.xl,
    marginTop: Spacing.lg,
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: Spacing["2xl"],
  },
  statDivider: {
    width: 1,
    height: 32,
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  editButton: {
    flex: 1,
    marginRight: Spacing.md,
  },
  settingsButton: {
    width: Spacing.buttonHeight,
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: Spacing.lg,
    gap: GRID_GAP,
  },
  gridItem: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE,
    borderRadius: BorderRadius.xs,
    overflow: "hidden",
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
});
