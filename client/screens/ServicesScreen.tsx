import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, FlatList, RefreshControl, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { AdCarousel } from "@/components/AdCarousel";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Colors } from "@/constants/theme";
import { mockServices, Service } from "@/data/mockData";

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

  const handleServicePress = (service: Service) => {
    Haptics.selectionAsync();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.md,
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

      <View style={[styles.servicesCard, { backgroundColor: theme.backgroundDefault }]}>
        <View style={styles.servicesGrid}>
          {mockServices.map((service) => (
            <Pressable
              key={service.id}
              testID={`service-${service.id}`}
              onPress={() => handleServicePress(service)}
              style={styles.serviceItem}
            >
              <View style={[styles.serviceIcon, { backgroundColor: service.color + "15" }]}>
                <Feather name={service.icon as any} size={24} color={service.color} />
              </View>
              <ThemedText type="small" style={styles.serviceLabel} numberOfLines={1}>
                {service.name}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Recent Activity
        </ThemedText>
        <View style={[styles.activityCard, { backgroundColor: theme.backgroundDefault }]}>
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: Colors.light.primary + "15" }]}>
              <Feather name="check-circle" size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.activityContent}>
              <ThemedText type="body">Welcome to the app!</ThemedText>
              <ThemedText type="small" style={{ color: theme.textTertiary }}>
                Start exploring our services
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  servicesCard: {
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  serviceItem: {
    width: "25%",
    alignItems: "center",
    paddingVertical: Spacing.md,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xs,
  },
  serviceLabel: {
    textAlign: "center",
  },
  section: {
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  activityCard: {
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activityContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
});
