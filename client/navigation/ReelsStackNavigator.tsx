import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReelsScreen from "@/screens/ReelsScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type ReelsStackParamList = {
  ReelsList: undefined;
};

const Stack = createNativeStackNavigator<ReelsStackParamList>();

export default function ReelsStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="ReelsList"
        component={ReelsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
