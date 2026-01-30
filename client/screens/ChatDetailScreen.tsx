import React, { useState, useCallback, useRef, useEffect } from "react";
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
  { id: "photo", icon: "image", label: "Photo", color: "#00B900" },
  { id: "video", icon: "video", label: "Video", color: "#A855F7" },
  { id: "audio", icon: "mic", label: "Audio", color: "#FF6B6B" },
  { id: "file", icon: "file", label: "File", color: "#4ECDC4" },
  { id: "sticker", icon: "smile", label: "Sticker", color: "#FFE66D" },
  { id: "link", icon: "link", label: "Link", color: "#3B82F6" },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ChatDetailScreen({ route }: ChatDetailScreenProps) {
  const { chatId } = route.params;
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<Message[]>(
    () => [...(mockMessages[chatId] || [])].reverse()
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
      <Feather name="message-circle" size={48} color={theme.textTertiary} />
      <ThemedText type="body" style={{ color: theme.textSecondary, marginTop: Spacing.md }}>
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
      {messages.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          inverted
          contentContainerStyle={[
            styles.listContent,
            { paddingTop: Spacing.sm, paddingBottom: headerHeight },
          ]}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={[styles.emptyWrapper, { paddingTop: headerHeight }]}>
          {renderEmpty()}
        </View>
      )}

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
                  <Feather name={option.icon as any} size={20} color="#FFFFFF" />
                </View>
                <ThemedText type="small" style={{ marginTop: 4, color: theme.textSecondary }}>
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
            paddingBottom: insets.bottom > 0 ? insets.bottom : Spacing.sm,
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
              backgroundColor: theme.backgroundTertiary,
              color: theme.text,
            },
          ]}
          placeholder="Message"
          placeholderTextColor={theme.textTertiary}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={1000}
        />
        <Pressable
          testID="send-button"
          onPress={handleSend}
          style={styles.sendButton}
          disabled={!inputText.trim()}
        >
          <Feather
            name="send"
            size={22}
            color={inputText.trim() ? Colors.light.primary : theme.textTertiary}
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
    paddingHorizontal: Spacing.sm,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
  },
  attachmentPanel: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
    borderTopWidth: 1,
  },
  attachmentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  attachmentItem: {
    alignItems: "center",
    width: "33.33%",
    paddingVertical: Spacing.sm,
  },
  attachmentIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
  },
  attachButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 100,
    borderRadius: 18,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === "ios" ? 8 : 6,
    fontSize: 15,
    fontFamily: "Nunito_400Regular",
  },
  sendButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});
