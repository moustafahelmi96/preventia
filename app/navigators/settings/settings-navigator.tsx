import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { SettingsScreen } from "../../screens"

export type SettingsNavigatorParamList = {
  settings: undefined
}

const Stack = createStackNavigator<SettingsNavigatorParamList>()
export const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}
