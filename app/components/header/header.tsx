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
export interface HeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  title: string
  onSelectUserPress?: any
}

/**
 * Describe your component here
 */
export const Header = observer(function Header(props: HeaderProps) {
  const { title, onSelectUserPress } = props
  const { activeUser } = useContext(GeneralContext)
  return (
    <SafeAreaView>
      <MainContainer>
        <Typography text={title} />
        {onSelectUserPress && (
          <ActiveUserContainer
            onPress={() => {
              onSelectUserPress()
            }}
          >
            {!isEmpty(activeUser) ? (
              <>
                <ProfileRoundedImage image={activeUser.picture} size={9} />
                <Typography text={`${activeUser.firstName} ${activeUser.lastName}`} maxChar={12} />
              </>
            ) : (
              <Typography text={"Choose user"} />
            )}
          </ActiveUserContainer>
        )}
      </MainContainer>
    </SafeAreaView>
  )
})

const MainContainer = styled.View`
  width: 100%;
  height: ${perfectHeight(9)}px;
  padding-horizontal: ${perfectWidth(3)}px;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: space-between;
  background-color: ${color.palette.orangeDarker};
  
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
