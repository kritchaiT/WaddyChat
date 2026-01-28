import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PostsScreen from "@/screens/PostsScreen";
import { useScreenOptions } from "@/hooks/useScreenOptions";

export type PostsStackParamList = {
  PostsList: undefined;
};

const Stack = createNativeStackNavigator<PostsStackParamList>();

export default function PostsStackNavigator() {
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="PostsList"
        component={PostsScreen}
        options={{
          headerTitle: "Posts",
        }}
      />
    </Stack.Navigator>
  );
}
