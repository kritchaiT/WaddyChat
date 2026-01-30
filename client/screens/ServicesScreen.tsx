import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, RefreshControl, Pressable, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { AdCarousel } from "@/components/AdCarousel";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";
import { mockServices, mockNews, Service, NewsItem } from "@/data/mockData";

const extraServices: Service[] = [
  { id: "9", name: "Shopping", icon: "shopping-bag", color: "#EC4899", description: "" },
  { id: "10", name: "Games", icon: "play", color: "#8B5CF6", description: "" },
  { id: "11", name: "Music", icon: "music", color: "#F59E0B", description: "" },
  { id: "12", name: "Weather", icon: "cloud", color: "#06B6D4", description: "" },
];

const allServices = [...mockServices, ...extraServices];

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleServicePress = (service: Service) => {
    Haptics.selectionAsync();
  };

  const filteredServices = searchText
    ? allServices.filter((s) => s.name.toLowerCase().includes(searchText.toLowerCase()))
    : allServices;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.sm,
        paddingBottom: tabBarHeight + Spacing.lg,
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
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.backgroundDefault }]}>
          <Feather name="search" size={18} color={theme.textTertiary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search services..."
            placeholderTextColor={theme.textTertiary}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText ? (
            <Pressable onPress={() => setSearchText("")}>
              <Feather name="x" size={18} color={theme.textTertiary} />
            </Pressable>
          ) : null}
        </View>
      </View>

      <AdCarousel />

      <View style={[styles.servicesCard, { backgroundColor: theme.backgroundDefault }]}>
        <View style={styles.servicesGrid}>
          {filteredServices.map((service) => (
            <Pressable
              key={service.id}
              testID={`service-${service.id}`}
              onPress={() => handleServicePress(service)}
              style={styles.serviceItem}
            >
              <View style={[styles.serviceIcon, { backgroundColor: service.color + "15" }]}>
                <Feather name={service.icon as any} size={20} color={service.color} />
              </View>
              <ThemedText type="small" style={styles.serviceLabel} numberOfLines={1}>
                {service.name}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>Hot News</ThemedText>
        {mockNews.map((news) => (
          <Pressable
            key={news.id}
            style={[styles.newsItem, { backgroundColor: theme.backgroundDefault }]}
          >
            <View style={styles.newsContent}>
              <View style={[styles.newsBadge, { backgroundColor: Colors.light.primary + "20" }]}>
                <ThemedText type="small" style={{ color: Colors.light.primary, fontSize: 10 }}>
                  {news.category}
                </ThemedText>
              </View>
              <ThemedText type="body" numberOfLines={2} style={styles.newsTitle}>
                {news.title}
              </ThemedText>
              <ThemedText type="small" style={{ color: theme.textTertiary }}>
                {news.timestamp}
              </ThemedText>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    height: 38,
    borderRadius: 19,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
  },
  servicesCard: {
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.xs,
    marginBottom: Spacing.md,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  serviceItem: {
    width: "25%",
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },
  serviceIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  serviceLabel: {
    fontSize: 11,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: Spacing.md,
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
  },
  newsItem: {
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.sm,
    overflow: "hidden",
  },
  newsContent: {
    padding: Spacing.md,
  },
  newsBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  newsTitle: {
    fontWeight: "500",
    marginBottom: 4,
  },
});
