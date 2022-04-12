import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { perfectHeight, perfectWidth } from "../../utils/commonFunctions"
import styled from "styled-components/native"
import Typography from "../Typography"
import { ProfileRoundedImage } from "../profile-rounded-image/profile-rounded-image"

export interface CommentProps {
  /**
   * An optional style override useful for padding & margin.
   */
  comment: string
  userImage: string
  userName: string
}

/**
 * Describe your component here
 */
export const Comment = observer(function Comment(props: CommentProps) {
  const { comment, userName, userImage } = props
  return (
    <MainContainer>
      <ProfileContainer>
        <ProfileRoundedImage image={userImage} size={12} />
        <Typography text={userName} width={"80%"} noLimit />
      </ProfileContainer>
      <Typography text={comment} width={"90%"} textAlign={"center"} alignSelf={"center"} />
    </MainContainer>
  )
})

const MainContainer = styled.View.attrs({
  shadowColor: "#000",
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
})`
  width: 90%;
  padding-vertical: ${perfectHeight(1)}px;
  align-self: center;
  justify-content: center;
  align-items: center;
  background-color: ${color.palette.white};
  margin-top: ${perfectHeight(2)}px;
  border-top-left-radius: ${perfectWidth(7)}px;
`

const ProfileContainer = styled.View`
  width: 90%;
  height: ${perfectHeight(8)}px;
  align-self: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
