import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Platform,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

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

interface AttachmentOption {
  id: string;
  icon: string;
  label: string;
  color: string;
}

const attachmentOptions: AttachmentOption[] = [
  { id: "audio", icon: "mic", label: "Audio", color: "#FF6B6B" },
  { id: "sticker", icon: "smile", label: "Sticker", color: "#FFE66D" },
  { id: "file", icon: "file", label: "File", color: "#4ECDC4" },
  { id: "photo", icon: "image", label: "Photo", color: "#00B900" },
  { id: "video", icon: "video", label: "Video", color: "#A855F7" },
  { id: "link", icon: "link", label: "Link", color: "#3B82F6" },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ChatDetailScreen({ route }: ChatDetailScreenProps) {
  const { chatId } = route.params;
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>(
    mockMessages[chatId] || []
  );
  const [inputText, setInputText] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);
  const attachScale = useSharedValue(1);

  const attachAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: showAttachments ? "45deg" : "0deg" }, { scale: attachScale.value }],
  }));

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

  const handleAttachPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    attachScale.value = withSpring(0.9, { damping: 15 });
    setTimeout(() => {
      attachScale.value = withSpring(1, { damping: 15 });
    }, 100);
    setShowAttachments(!showAttachments);
  };

  const handleAttachmentSelect = (option: AttachmentOption) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowAttachments(false);
  };

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
        data={messages}
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

      {showAttachments ? (
        <View style={[styles.attachmentPanel, { backgroundColor: theme.backgroundDefault, borderTopColor: theme.border }]}>
          <View style={styles.attachmentGrid}>
            {attachmentOptions.map((option) => (
              <Pressable
                key={option.id}
                testID={`attach-${option.id}`}
                style={styles.attachmentItem}
                onPress={() => handleAttachmentSelect(option)}
              >
                <View style={[styles.attachmentIcon, { backgroundColor: option.color }]}>
                  <Feather name={option.icon as any} size={24} color="#FFFFFF" />
                </View>
                <ThemedText type="small" style={{ marginTop: Spacing.xs }}>
                  {option.label}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}

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
        <AnimatedPressable 
          testID="attach-button"
          style={[styles.attachButton, attachAnimatedStyle]} 
          onPress={handleAttachPress}
        >
          <Feather name="plus" size={24} color={showAttachments ? Colors.light.primary : theme.textSecondary} />
        </AnimatedPressable>
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
    paddingHorizontal: Spacing.lg,
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
  attachmentPanel: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    borderTopWidth: 1,
  },
  attachmentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  attachmentItem: {
    alignItems: "center",
    width: "33%",
    paddingVertical: Spacing.md,
  },
  attachmentIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
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
