import React, { useState, useCallback } from "react";
import { FlatList, View, StyleSheet, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";

import { PostCard } from "@/components/PostCard";
import { FAB } from "@/components/FAB";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Colors } from "@/constants/theme";
import { mockPosts, Post } from "@/data/mockData";

export default function PostsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const [posts] = useState<Post[]>(mockPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleNewPost = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const renderItem = ({ item }: { item: Post }) => (
    <PostCard post={item} />
  );

  const renderEmpty = () => (
    <EmptyState
      image={require("../../assets/images/empty-posts.png")}
      title="No posts yet"
      description="Be the first to share something"
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingTop: headerHeight + Spacing.lg,
            paddingBottom: tabBarHeight + Spacing.fabSize + Spacing["2xl"],
            paddingHorizontal: Spacing.lg,
          },
          posts.length === 0 && styles.emptyList,
        ]}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.light.primary}
            progressViewOffset={headerHeight}
          />
        }
      />
      <FAB
        testID="fab-new-post"
        onPress={handleNewPost}
        icon="camera"
        style={[styles.fab, { bottom: tabBarHeight + Spacing.lg }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    right: Spacing.lg,
  },
});
