import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { HomeScreen, PostDetailsScreen } from "../../screens"

export type HomeNavigatorParamList = {
  home: undefined
  postDetails: undefined
}

const Stack = createStackNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="postDetails" component={PostDetailsScreen} />
    </Stack.Navigator>
  )
}
