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
import * as ImagePicker from "expo-image-picker";

import { MessageBubble } from "@/components/MessageBubble";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";
import { mockMessages, Message } from "@/data/mockData";
import { supabase } from "@/lib/supabase";

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

  // Real-time subscription (Mocked)
  useEffect(() => {
    // const channel = supabase
    //   .channel(`chat:${chatId}`)
    //   .on(
    //     "postgres_changes",
    //     { event: "INSERT", schema: "public", table: "messages", filter: `chat_id=eq.${chatId}` },
    //     (payload) => {
    //       const newMessage = payload.new as any; // Cast to any or define Supabase message type
    //       const formattedMessage: Message = {
    //         id: newMessage.id,
    //         chatId: newMessage.chat_id,
    //         text: newMessage.text,
    //         timestamp: new Date(newMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    //         isSent: newMessage.user_id !== "current", // Determine ownership based on auth
    //       };
    //
    //       setMessages((prev) => {
    //         // Avoid duplicates if we already added it optimally
    //         if (prev.some(m => m.id === formattedMessage.id)) return prev;
    //         return [formattedMessage, ...prev];
    //       });
    //       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    //     }
    //   )
    //   .subscribe();
    //
    // return () => {
    //   supabase.removeChannel(channel);
    // };
  }, [chatId]);

  const handleSend = useCallback(async () => {
    if (inputText.trim()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Optimistic update
      const optimisticMsg: Message = {
        id: Date.now().toString(),
        chatId,
        text: inputText.trim(),
        timestamp: "Just now",
        isSent: true,
      };
      setMessages((prev) => [optimisticMsg, ...prev]);
      const contentToSend = inputText.trim();
      setInputText("");

      // Mock sending to backend
      console.log("Mock sending message:", contentToSend);

      // const newMessage = {
      //   chat_id: chatId,
      //   text: contentToSend,
      //   user_id: "current", // Replace with real auth user ID logic
      //   timestamp: new Date().toISOString(),
      //   is_sent: true,
      // };
      //
      // const { error } = await supabase.from("messages").insert(newMessage);
      // if (error) {
      //   console.error("Error sending message:", error);
      // }
    }
  }, [inputText, chatId]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Handle image upload logic here
      console.log("Selected Image:", result.assets[0].uri);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowAttachments(false);
      // Logic to upload image to Supabase Storage and send message would go here
    }
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      console.log("Selected File:", result.assets[0].uri);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowAttachments(false);
      // Logic to upload file to Supabase Storage
    }
  };

  const handleAttachPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    attachScale.value = withSpring(0.9, { damping: 15 });
    setTimeout(() => {
      attachScale.value = withSpring(1, { damping: 15 });
    }, 100);
    setShowAttachments(!showAttachments);
  };

  const handleAttachmentSelect = async (option: AttachmentOption) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (option.id === "photo") {
      await pickImage();
    }
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
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
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
