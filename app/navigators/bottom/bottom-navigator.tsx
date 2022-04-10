import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { color } from "../../theme"
import { HomeNavigator } from "../home/home-navigator"
import { View } from "react-native"
import Typography from "../../components/Typography"
import { palette } from "../../theme/palette"
import { perfectWidth } from "../../utils/commonFunctions"

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
            focused ? (
              <ActiveComponent label={"Home"} />
            ) : (
              <Typography text={'Home'} />
            )
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
  borderColor: color.palette.orangeDarker,
  borderRadius: 2,
  width: perfectWidth(8),
}

const ACTIVE_COMPONENT = {
  height: "100%",
  justifyContent: "space-evenly",
  alignItems: "center",
}
