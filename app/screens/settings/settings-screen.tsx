import React, { FC, useContext, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Header, Screen, VerticalSpace } from "../../components"
import { color } from "../../theme"
import GeneralContext from "../../context/GeneralContext"

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
        <Header title={"Hello!"} />
        <VerticalSpace height={55} />
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
