import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Input, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import styled from 'styled-components/native'
import { perfectWidth } from "../../utils/commonFunctions"
import Typography from "../../components/Typography"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `login: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="login" component={LoginScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed">
      <MainContainer>
        <CurvedContainer>
          <Typography text="Login" size={40} />
          <Input title="Email" placeholder="********@test.com" keyboardType="email-address" />
          <Input title="Password" placeholder="********" secureTextEntry />
          <Button text="Login" width={80} backgroundColor={'green'} />
        </CurvedContainer>
      </MainContainer>
    </Screen>
  )
})


const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const MainContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  background-color: ${color.palette.lightGrey};
`

const CurvedContainer = styled.View`
  width: 100%;
  height: 80%;
  align-items: center;
  justify-content: space-evenly;
  border-top-left-radius: ${perfectWidth(20)}px;
  background-color: ${color.palette.white};
`
