import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ChatListItem } from "@/components/ChatListItem";
import { FAB } from "@/components/FAB";
import { EmptyState } from "@/components/EmptyState";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { mockChats, Chat } from "@/data/mockData";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ChatsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [chats] = useState<Chat[]>(mockChats);

  const handleChatPress = (chat: Chat) => {
    navigation.navigate("ChatDetail", { chatId: chat.id, chatName: chat.name });
  };

  const handleNewChat = () => {
    // For demo, navigate to first chat
    if (chats.length > 0) {
      handleChatPress(chats[0]);
    }
  };

  const renderItem = ({ item }: { item: Chat }) => (
    <ChatListItem chat={item} onPress={() => handleChatPress(item)} />
  );

  const renderEmpty = () => (
    <EmptyState
      image={require("../../assets/images/empty-chats.png")}
      title="No conversations yet"
      description="Start a new chat to connect with friends"
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingTop: headerHeight + Spacing.sm,
            paddingBottom: tabBarHeight + Spacing.fabSize + Spacing["2xl"],
          },
          chats.length === 0 && styles.emptyList,
        ]}
        scrollIndicatorInsets={{ bottom: insets.bottom }}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
      <FAB
        testID="fab-new-chat"
        onPress={handleNewChat}
        icon="edit-3"
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
