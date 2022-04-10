import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  DemoScreen
} from "../../screens"

export type HomeNavigatorParamList = {
  demo: undefined
}

const Stack = createStackNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false, }}>
      <Stack.Screen name="demo" component={DemoScreen} />
    </Stack.Navigator>
  )
}
