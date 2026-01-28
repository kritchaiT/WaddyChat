import React from "react";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";
import type { Message } from "@/data/mockData";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        message.isSent ? styles.sentContainer : styles.receivedContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          message.isSent
            ? [styles.sentBubble, { backgroundColor: Colors.light.primary }]
            : [styles.receivedBubble, { backgroundColor: theme.backgroundDefault, borderColor: theme.border }],
        ]}
      >
        <ThemedText
          type="bodyLarge"
          style={message.isSent ? styles.sentText : { color: theme.text }}
        >
          {message.text}
        </ThemedText>
      </View>
      <ThemedText
        type="small"
        style={[
          styles.timestamp,
          { color: theme.textTertiary },
          message.isSent ? styles.sentTimestamp : styles.receivedTimestamp,
        ]}
      >
        {message.timestamp}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
    maxWidth: "80%",
  },
  sentContainer: {
    alignSelf: "flex-end",
    marginRight: Spacing.lg,
  },
  receivedContainer: {
    alignSelf: "flex-start",
    marginLeft: Spacing.lg,
  },
  bubble: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  sentBubble: {
    borderRadius: BorderRadius.lg,
    borderBottomRightRadius: Spacing.xs,
  },
  receivedBubble: {
    borderRadius: BorderRadius.lg,
    borderBottomLeftRadius: Spacing.xs,
    borderWidth: 1,
  },
  sentText: {
    color: "#FFFFFF",
  },
  timestamp: {
    marginTop: Spacing.xs,
  },
  sentTimestamp: {
    textAlign: "right",
    marginRight: Spacing.xs,
  },
  receivedTimestamp: {
    textAlign: "left",
    marginLeft: Spacing.xs,
  },
});
