import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatsScreen from "@/screens/ChatsScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type ChatsStackParamList = {
  ChatsList: undefined;
};

const Stack = createNativeStackNavigator<ChatsStackParamList>();

export default function ChatsStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="ChatsList"
        component={ChatsScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Chats" />,
        }}
      />
    </Stack.Navigator>
  );
}
