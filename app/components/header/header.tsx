import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { perfectHeight, perfectWidth } from "../../utils/commonFunctions"
import styled from "styled-components/native"
import Typography from "../Typography"


export interface HeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  title: string
}

/**
 * Describe your component here
 */
export const Header = observer(function Header(props: HeaderProps) {
  const { title } = props
  return (
    <MainContainer>
      <Typography text={title} />
    </MainContainer>
  )
})


const MainContainer = styled.View`
  width: 100%;
  height: ${perfectHeight(9)}px;
  padding-horizontal:${perfectWidth(3)}px;
  align-self: center;
  justify-content: center;
  background-color: ${color.palette.orangeDarker};
`