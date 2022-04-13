import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { color } from "../../theme"
import { HomeNavigator } from "../home/home-navigator"
import { View } from "react-native"
import Typography from "../../components/Typography"
import { perfectWidth } from "../../utils/commonFunctions"
import { SettingsNavigator } from "../settings/settings-navigator"
import { CreatePostNavigator } from "../create-post/create-post-navigator"

export type BottomNavigatorParamList = {
  demo: undefined
}

const Tab = createBottomTabNavigator()
export const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: TAB_BAR_STYLE,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: () => undefined,
          tabBarIcon: ({ focused }) =>
            focused ? <ActiveComponent label={"Home"} /> : <Typography text={"Home"} />,
        }}
      />
      <Tab.Screen
        name="Post"
        component={CreatePostNavigator}
        options={{
          tabBarLabel: () => undefined,
          tabBarIcon: ({ focused }) =>
            focused ? <ActiveComponent label={"Post"} /> : <Typography text={"Post"} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarLabel: () => undefined,
          tabBarIcon: ({ focused }) =>
            focused ? <ActiveComponent label={"Settings"} /> : <Typography text={"Settings"} />,
        }}
      />
    </Tab.Navigator>
  )
}

const ActiveComponent = ({ label }) => {
  return (
    <View style={ACTIVE_COMPONENT}>
      <Typography text={label} />
      <View style={GREEN_UNDERLINE} />
    </View>
  )
}

const TAB_BAR_STYLE = {
  backgroundColor: color.palette.white,
  shadowColor: color.palette.lightGreyBackground,
  paddingTop: 10,
  shadowOffset: {
    width: 0,
    height: -4,
  },
  shadowOpacity: 1,
  shadowRadius: 4,
}

const GREEN_UNDERLINE = {
  borderWidth: 2,
  borderColor: color.palette.redDarker,
  borderRadius: 2,
  width: perfectWidth(8),
}

const ACTIVE_COMPONENT = {
  height: "100%",
  justifyContent: "space-evenly",
  alignItems: "center",
}
