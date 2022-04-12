import React from "react"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"
import { perfectHeight, perfectWidth } from "../../utils/commonFunctions"
import styled from "styled-components/native"
import Typography from "../Typography"

export interface TagsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  title: string
}

/**
 * Describe your component here
 */
export const Tags = observer(function Tags(props: TagsProps) {
  const { title } = props
  return (
    <MainContainer>
      <Typography text={title} size={14} color={color.palette.lightGrey} />
    </MainContainer>
  )
})

const MainContainer = styled.TouchableOpacity`
  height: ${perfectHeight(3.5)}px;
  justify-content: center;
  align-items: center;
  border-width: 0.5px;
  border-top-left-radius: ${perfectWidth(1.5)}px;
  padding-horizontal: ${perfectWidth(3)}px;
  border-color: ${color.palette.orangeDarker};
`
