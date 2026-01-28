import React, { useState, useCallback, useRef } from "react";
import { View, StyleSheet, Dimensions, FlatList, ViewToken, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";

import { ReelCard } from "@/components/ReelCard";
import { FAB } from "@/components/FAB";
import { Spacing } from "@/constants/theme";
import { mockReels, Reel } from "@/data/mockData";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ReelsScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reels] = useState<Reel[]>(mockReels);
  
  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        const newIndex = viewableItems[0].index;
        if (newIndex !== currentIndex) {
          Haptics.selectionAsync();
          setCurrentIndex(newIndex);
        }
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNewReel = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const renderItem = ({ item, index }: { item: Reel; index: number }) => (
    <ReelCard reel={item} isActive={index === currentIndex} />
  );

  const getItemLayout = (_: any, index: number) => ({
    length: SCREEN_HEIGHT,
    offset: SCREEN_HEIGHT * index,
    index,
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={reels}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        getItemLayout={getItemLayout}
      />
      <FAB
        testID="fab-new-reel"
        onPress={handleNewReel}
        icon="video"
        style={[styles.fab, { bottom: tabBarHeight + Spacing.lg }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  fab: {
    position: "absolute",
    right: Spacing.lg,
  },
});
