import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { CreatePostScreen } from "../../screens"

export type CreatePostNavigatorParamList = {
  createPost: undefined
}

const Stack = createStackNavigator<CreatePostNavigatorParamList>()
export const CreatePostNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="createPost" component={CreatePostScreen} />
    </Stack.Navigator>
  )
}
