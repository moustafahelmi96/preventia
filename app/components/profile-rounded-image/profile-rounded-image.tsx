import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { palette } from "../../theme/palette"
import styled from "styled-components/native"
import { perfectWidth } from "../../utils/commonFunctions"

export interface ProfileRoundedImageProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  image: string
}

/**
 * Describe your component here
 */
export const ProfileRoundedImage = observer(function ProfileRoundedImage(props: ProfileRoundedImageProps) {
  const { image } = props

  return (
    <Border>
      <Image source={{ uri: image }} resizeMode="cover" />
    </Border>
  )
})

const Border = styled.View`
width: ${perfectWidth(16)}px;
height: ${perfectWidth(16)}px;
border-radius:${perfectWidth(76)}px;
 justify-content: center;
 align-items: center;
 background-color: ${palette.orange};
 `

const Image = styled.Image` 
   width: ${perfectWidth(13)}px;
  height: ${perfectWidth(13)}px;
  border-radius: ${perfectWidth(76)}px;
 `