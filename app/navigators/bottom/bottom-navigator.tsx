import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { color } from "../../theme"
import { HomeNavigator } from "../home/home-navigator"

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
        name="homeNavigator"
        component={HomeNavigator}
      // options={{
      //   tabBarLabel: () => undefined,
      //   tabBarIcon: ({ focused }) =>
      //     focused ? (
      //       <ActiveComponent label={"Home"} />
      //     ) : (
      //       <FontAwesomeIcon name={"bullhorn"} size={30} />
      //     ),
      // }}
      />
    </Tab.Navigator>
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

