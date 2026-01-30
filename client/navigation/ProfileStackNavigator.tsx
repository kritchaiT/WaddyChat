import React from "react";
import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import ProfileScreen from "@/screens/ProfileScreen";
import { ThemedText } from "@/components/ThemedText";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { currentUser } from "@/data/mockData";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

export type ProfileStackParamList = {
  ProfileMain: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

function ProfileHeader() {
  return (
    <ThemedText type="h4" style={{ fontWeight: "700" }}>
      {currentUser.username}
    </ThemedText>
  );
}

function SettingsButton() {
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSettings = () => {
    Haptics.selectionAsync();
    navigation.navigate("Settings");
  };

  return (
    <Pressable onPress={handleSettings} style={{ padding: Spacing.xs }}>
      <Feather name="settings" size={22} color={theme.text} />
    </Pressable>
  );
}

export default function ProfileStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{
          headerTitle: () => <ProfileHeader />,
          headerRight: () => <SettingsButton />,
        }}
      />
    </Stack.Navigator>
  );
}
