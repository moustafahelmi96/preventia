import React, { FC, useContext, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Screen, VerticalSpace } from "../../components"
import { color } from "../../theme"
import GeneralContext from "../../context/GeneralContext"
import { perfectHeight } from "../../utils/commonFunctions"
import styled from "styled-components/native"
import { LOGO } from "../../config/constants"

export const SettingsScreen: FC<StackScreenProps<NavigatorParamList, "settings">> = observer(
  function SettingsScreen() {
    const { logout } = useContext(GeneralContext)
    const [loader, setLoader] = useState(false)

    const handleLogout = () => {
      setLoader(true)
      logout()
    }
    return (
      <Screen style={ROOT} preset="scroll">
        <VerticalSpace height={5} />
        <LogoImage source={LOGO} />
        <VerticalSpace height={20} />
        <Button
          text="logout"
          loader={loader}
          onPress={() => {
            handleLogout()
          }}
        />
      </Screen>
    )
  },
)

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const LogoImage = styled.Image`
  width: 90%;
  height: ${perfectHeight(40)}px;
  align-self: center;
`
