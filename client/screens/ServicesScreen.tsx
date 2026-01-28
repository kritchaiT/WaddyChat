import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, FlatList, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";

import { AdCarousel } from "@/components/AdCarousel";
import { NewsCard } from "@/components/NewsCard";
import { ServiceItem } from "@/components/ServiceItem";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, Colors } from "@/constants/theme";
import { mockNews, mockServices, NewsItem, Service } from "@/data/mockData";

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const renderNewsItem = ({ item, index }: { item: NewsItem; index: number }) => (
    <NewsCard news={item} isFirst={false} />
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.lg,
        paddingBottom: tabBarHeight + Spacing.xl,
      }}
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
    >
      <AdCarousel />

      <View style={styles.section}>
        <ThemedText type="h3" style={styles.sectionTitle}>
          Services
        </ThemedText>
        <View style={[styles.servicesGrid, { backgroundColor: theme.backgroundDefault }]}>
          {mockServices.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText type="h3" style={styles.sectionTitle}>
          Latest News
        </ThemedText>
        {mockNews.length > 0 ? (
          <View style={styles.newsSection}>
            <NewsCard news={mockNews[0]} isFirst />
            <FlatList
              horizontal
              data={mockNews.slice(1)}
              keyExtractor={(item) => item.id}
              renderItem={renderNewsItem}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.newsList}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  newsSection: {
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  newsList: {
    paddingRight: Spacing.lg,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 16,
    paddingVertical: Spacing.sm,
  },
});
