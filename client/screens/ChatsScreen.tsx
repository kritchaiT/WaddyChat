import React, { useState, useCallback } from "react";
import { View, StyleSheet, FlatList, RefreshControl, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ChatListItem } from "@/components/ChatListItem";
import { FAB } from "@/components/FAB";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Colors } from "@/constants/theme";
import { mockChats, Chat } from "@/data/mockData";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ChatsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [chats] = useState<Chat[]>(mockChats);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleChatPress = (chat: Chat) => {
    navigation.navigate("ChatDetail", { chatId: chat.id, chatName: chat.name });
  };

  const handleNewChat = () => {
    Haptics.selectionAsync();
    if (chats.length > 0) {
      handleChatPress(chats[0]);
    }
  };

  const renderItem = ({ item }: { item: Chat }) => (
    <ChatListItem chat={item} onPress={() => handleChatPress(item)} />
  );

  const renderHeader = () => (
    <View style={styles.quickActions}>
      <Pressable 
        testID="quick-new-group"
        style={[styles.quickAction, { backgroundColor: theme.backgroundDefault }]}
        onPress={() => Haptics.selectionAsync()}
      >
        <View style={[styles.quickIcon, { backgroundColor: Colors.light.primary + "15" }]}>
          <Feather name="users" size={16} color={Colors.light.primary} />
        </View>
        <ThemedText type="small">New Group</ThemedText>
      </Pressable>
      <Pressable 
        testID="quick-add-friend"
        style={[styles.quickAction, { backgroundColor: theme.backgroundDefault }]}
        onPress={() => Haptics.selectionAsync()}
      >
        <View style={[styles.quickIcon, { backgroundColor: Colors.light.primary + "15" }]}>
          <Feather name="user-plus" size={16} color={Colors.light.primary} />
        </View>
        <ThemedText type="small">Add Friend</ThemedText>
      </Pressable>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Feather name="message-circle" size={40} color={theme.textTertiary} />
      <ThemedText type="body" style={{ color: theme.textSecondary, marginTop: Spacing.sm }}>
        No conversations yet
      </ThemedText>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: headerHeight + Spacing.xs, paddingBottom: tabBarHeight + Spacing.fabSize + Spacing.lg },
          chats.length === 0 && styles.emptyList,
        ]}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
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
        testID="fab-new-chat"
        onPress={handleNewChat}
        icon="edit-3"
        style={{ position: "absolute", right: Spacing.md, bottom: tabBarHeight + Spacing.md }}
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
  quickActions: {
    flexDirection: "row",
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  quickAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.sm,
    borderRadius: 8,
    gap: Spacing.sm,
  },
  quickIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
  },
});
