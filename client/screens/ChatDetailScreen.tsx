import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { MessageBubble } from "@/components/MessageBubble";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";
import { mockMessages, Message } from "@/data/mockData";

interface ChatDetailScreenProps {
  route: {
    params: {
      chatId: string;
      chatName: string;
    };
  };
}

export default function ChatDetailScreen({ route }: ChatDetailScreenProps) {
  const { chatId } = route.params;
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>(
    mockMessages[chatId] || []
  );
  const [inputText, setInputText] = useState("");

  const handleSend = useCallback(() => {
    if (inputText.trim()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const newMessage: Message = {
        id: Date.now().toString(),
        chatId,
        text: inputText.trim(),
        timestamp: "Just now",
        isSent: true,
      };
      setMessages((prev) => [newMessage, ...prev]);
      setInputText("");
    }
  }, [inputText, chatId]);

  const renderItem = ({ item }: { item: Message }) => (
    <MessageBubble message={item} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <ThemedText type="body" style={{ color: theme.textSecondary }}>
        Start the conversation
      </ThemedText>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      <FlatList
        data={messages.length > 0 ? messages.toReversed() : []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        inverted={messages.length > 0}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingTop: Spacing.lg,
            paddingBottom: headerHeight + Spacing.lg,
          },
          messages.length === 0 && styles.emptyList,
        ]}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.backgroundDefault,
            borderTopColor: theme.border,
            paddingBottom: insets.bottom > 0 ? insets.bottom : Spacing.md,
          },
        ]}
      >
        <Pressable style={styles.attachButton}>
          <Feather name="image" size={22} color={theme.textSecondary} />
        </Pressable>
        <TextInput
          testID="message-input"
          style={[
            styles.input,
            {
              backgroundColor: theme.backgroundSecondary,
              color: theme.text,
            },
          ]}
          placeholder="Type a message..."
          placeholderTextColor={theme.textTertiary}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={1000}
        />
        <Pressable
          testID="send-button"
          onPress={handleSend}
          style={[
            styles.sendButton,
            {
              backgroundColor: inputText.trim()
                ? Colors.light.primary
                : theme.backgroundTertiary,
            },
          ]}
          disabled={!inputText.trim()}
        >
          <Feather
            name="send"
            size={18}
            color={inputText.trim() ? "#FFFFFF" : theme.textTertiary}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
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
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    transform: [{ scaleY: -1 }],
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },
  attachButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.xs,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Platform.OS === "ios" ? Spacing.sm : Spacing.xs,
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: Spacing.sm,
  },
});
