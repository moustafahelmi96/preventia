import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"
import { perfectHeight, perfectWidth } from "../../utils/commonFunctions"
import styled from "styled-components/native"
import Typography from "../Typography"
import GeneralContext from "../../context/GeneralContext"
import { ProfileRoundedImage } from "../profile-rounded-image/profile-rounded-image"
import { isEmpty } from "ramda"
import { SafeAreaView } from "react-native"
import { LOGO } from "../../config/constants"
import { Icon } from "../icon/icon"
import { useNavigation } from "@react-navigation/native"
export interface HeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  onSelectUserPress?: any
  back?: boolean
  showDropdown?: boolean
}

/**
 * Describe your component here
 */
export const Header = observer(function Header(props: HeaderProps) {
  const { onSelectUserPress, back, showDropdown } = props
  const { activeUser } = useContext(GeneralContext)
  const navigation = useNavigation()

  const headerRender = () => {
    switch (true) {
      case back:
        return (
          <MainContainer justify={"space-between"}>
            {back && (
              <Icon
                icon={"back"}
                onPress={() => {
                  navigation.goBack()
                }}
              />
            )}
            <Logo source={LOGO} />
            <EmptyView />
          </MainContainer>
        )

      case showDropdown:
        return (
          <MainContainer justify={"space-between"}>
            <Logo source={LOGO} />
            {onSelectUserPress && (
              <ActiveUserContainer
                onPress={() => {
                  onSelectUserPress()
                }}
              >
                {!isEmpty(activeUser) ? (
                  <>
                    <ProfileRoundedImage image={activeUser.picture} size={9} />
                    <Typography
                      text={`${activeUser.firstName} ${activeUser.lastName}`}
                      color={color.palette.white}
                      maxChar={12}
                    />
                  </>
                ) : (
                  <Typography text={"Choose user"} color={color.palette.white} />
                )}
              </ActiveUserContainer>
            )}
          </MainContainer>
        )
      default:
        return (
          <MainContainer justify={"center"}>
            <Logo source={LOGO} />
          </MainContainer>
        )
    }
  }
  return <SafeAreaView>{headerRender()}</SafeAreaView>
})

const MainContainer = styled.View`
  width: 100%;
  height: ${perfectHeight(9)}px;
  padding-horizontal: ${perfectWidth(3)}px;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: ${({ justify }) => justify};
  background-color: ${color.palette.redDarker};
`

const ActiveUserContainer = styled.TouchableOpacity`
  width: 45%;
  height: 65%;
  border-top-left-radius: ${perfectWidth(5)}px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${color.palette.lightGreyBackground};
  border-width: 1px;
  border-color: ${color.palette.white};
`

const Logo = styled.Image`
  width: ${perfectWidth(15)}px;
  height: ${perfectWidth(15)}px;
  border-radius: ${perfectWidth(15) / 2}px;
`

const EmptyView = styled.View`
  width: ${perfectWidth(2)}px;
`
