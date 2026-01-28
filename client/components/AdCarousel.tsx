import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Pressable, Dimensions, FlatList, ViewToken } from "react-native";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";

interface Ad {
  id: string;
  title: string;
  subtitle: string;
  image: any;
  backgroundColor: string;
}

const mockAds: Ad[] = [
  {
    id: "1",
    title: "Get 20% Off",
    subtitle: "Use code WELCOME20",
    image: require("../../assets/images/sample-post-1.png"),
    backgroundColor: "#00B900",
  },
  {
    id: "2",
    title: "New Rewards Program",
    subtitle: "Earn points on every purchase",
    image: require("../../assets/images/sample-post-2.png"),
    backgroundColor: "#FF6B6B",
  },
  {
    id: "3",
    title: "Free Delivery",
    subtitle: "On orders above $30",
    image: require("../../assets/images/sample-post-3.png"),
    backgroundColor: "#4ECDC4",
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - Spacing.lg * 2;

export function AdCarousel() {
  const { theme } = useTheme();
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % mockAds.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleAdPress = (ad: Ad) => {
    Haptics.selectionAsync();
  };

  const renderItem = ({ item }: { item: Ad }) => (
    <Pressable
      testID={`ad-${item.id}`}
      onPress={() => handleAdPress(item)}
      style={[styles.adCard, { backgroundColor: item.backgroundColor }]}
    >
      <View style={styles.adContent}>
        <ThemedText type="h3" style={styles.adTitle}>
          {item.title}
        </ThemedText>
        <ThemedText type="body" style={styles.adSubtitle}>
          {item.subtitle}
        </ThemedText>
      </View>
      <Image source={item.image} style={styles.adImage} contentFit="cover" />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={mockAds}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        snapToInterval={CARD_WIDTH + Spacing.md}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.pagination}>
        {mockAds.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  index === activeIndex
                    ? Colors.light.primary
                    : theme.backgroundTertiary,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
  },
  adCard: {
    width: CARD_WIDTH,
    height: 140,
    borderRadius: BorderRadius.sm,
    flexDirection: "row",
    overflow: "hidden",
    marginRight: Spacing.md,
  },
  adContent: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: "center",
  },
  adTitle: {
    color: "#FFFFFF",
    marginBottom: Spacing.xs,
  },
  adSubtitle: {
    color: "rgba(255,255,255,0.85)",
  },
  adImage: {
    width: 120,
    height: "100%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing.md,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
