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
  size?: number
}

/**
 * Describe your component here
 */
export const ProfileRoundedImage = observer(function ProfileRoundedImage(
  props: ProfileRoundedImageProps,
) {
  const { image, size } = props

  return (
    <Border size={size}>
      <Image source={{ uri: image }} resizeMode="cover" size={size} />
    </Border>
  )
})

const Border = styled.View`
  width: ${({ size }) => (size ? perfectWidth(size) : perfectWidth(16))}px;
  height: ${({ size }) => (size ? perfectWidth(size) : perfectWidth(16))}px;
  border-radius: ${perfectWidth(76)}px;
  justify-content: center;
  align-items: center;
  background-color: ${palette.lighterRed};
`

const Image = styled.Image`
  width: ${({ size }) => (size ? perfectWidth(size - 1.5) : perfectWidth(13))}px;
  height: ${({ size }) => (size ? perfectWidth(size - 1.5) : perfectWidth(13))}px;
  border-radius: ${perfectWidth(76)}px;
`
