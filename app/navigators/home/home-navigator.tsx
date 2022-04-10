import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  HomeScreen
} from "../../screens"

export type HomeNavigatorParamList = {
  home: undefined
}

const Stack = createStackNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false, }}>
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  )
}
