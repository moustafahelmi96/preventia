import React, { useContext, useState } from "react"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { perfectHeight, perfectWidth } from "../../utils/commonFunctions"
import styled from "styled-components/native"
import Typography from "../Typography"
import GeneralContext from "../../context/GeneralContext"
import { ProfileRoundedImage } from "../profile-rounded-image/profile-rounded-image"

export interface HeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  title: string
  onSelectUserPress: any
}

/**
 * Describe your component here
 */
export const Header = observer(function Header(props: HeaderProps) {
  const { title, onSelectUserPress } = props
  const { activeUser } = useContext(GeneralContext)
  return (
    <MainContainer>
      <Typography text={title} />
      <ActiveUserContainer
        onPress={() => {
          onSelectUserPress()
        }}
      >
        {activeUser ? (
          <>
            <ProfileRoundedImage image={activeUser.avatar} size={9} />
            <Typography text={`${activeUser.first_name} ${activeUser.last_name}`} />
          </>
        ) : (
          <Typography text={"Choose user"} />
        )}
      </ActiveUserContainer>
    </MainContainer>
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
  background-color: ${color.palette.angry};
`
