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
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";
import { currentUser, mockReels } from "@/data/mockData";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const GRID_GAP = 1;
const GRID_ITEM_SIZE = (SCREEN_WIDTH - GRID_GAP * 2) / 3;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

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
        paddingTop: headerHeight,
        paddingBottom: tabBarHeight + Spacing.lg,
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
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <ThemedText type="h4" style={styles.statNumber}>{currentUser.postsCount}</ThemedText>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>Posts</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText type="h4" style={styles.statNumber}>{formatNumber(currentUser.followersCount)}</ThemedText>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>Followers</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText type="h4" style={styles.statNumber}>{formatNumber(currentUser.followingCount)}</ThemedText>
            <ThemedText type="small" style={{ color: theme.textSecondary }}>Following</ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.bioSection}>
        <ThemedText type="body" style={styles.name}>{currentUser.name}</ThemedText>
        <ThemedText type="small" style={{ color: theme.textSecondary }}>{currentUser.bio}</ThemedText>
      </View>

      <View style={styles.actions}>
        <Pressable
          testID="edit-profile-button"
          onPress={handleEditProfile}
          style={[styles.editButton, { backgroundColor: theme.backgroundDefault, borderColor: theme.border }]}
        >
          <ThemedText type="body" style={{ fontWeight: "600" }}>Edit Profile</ThemedText>
        </Pressable>
        <Pressable
          testID="share-profile-button"
          style={[styles.shareButton, { backgroundColor: theme.backgroundDefault, borderColor: theme.border }]}
        >
          <Feather name="share-2" size={18} color={theme.text} />
        </Pressable>
      </View>

      <View style={styles.tabBar}>
        <Pressable style={[styles.tab, styles.activeTab]}>
          <Feather name="grid" size={22} color={theme.text} />
        </Pressable>
        <Pressable style={styles.tab}>
          <Feather name="play-circle" size={22} color={theme.textTertiary} />
        </Pressable>
        <Pressable style={styles.tab}>
          <Feather name="bookmark" size={22} color={theme.textTertiary} />
        </Pressable>
      </View>

      <View style={styles.grid}>
        {mockReels.map((item) => (
          <Pressable key={item.id} style={styles.gridItem}>
            <Image source={item.thumbnail} style={styles.gridImage} contentFit="cover" />
            {item.isVideo ? (
              <View style={styles.videoIcon}>
                <Feather name="play" size={14} color="#FFFFFF" />
              </View>
            ) : null}
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: Spacing.lg,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontWeight: "700",
  },
  bioSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  name: {
    fontWeight: "600",
    marginBottom: 2,
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  editButton: {
    flex: 1,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  shareButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE,
    marginRight: GRID_GAP,
    marginBottom: GRID_GAP,
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
  videoIcon: {
    position: "absolute",
    top: 6,
    right: 6,
  },
});
