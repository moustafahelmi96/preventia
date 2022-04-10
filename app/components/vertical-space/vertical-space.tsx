import React from "react"
import { observer } from "mobx-react-lite"
import styled from "styled-components/native"
import { perfectHeight } from "../../utils/commonFunctions"


export interface VerticalSpaceProps {
  /**
   * An optional style override useful for padding & margin.
   */
  height: number
}

/**
 * Describe your component here
 */
export const VerticalSpace = observer(function VerticalSpace(props: VerticalSpaceProps) {
  const { height } = props
  return (
    <MainContainer height={height}>
    </MainContainer>
  )
})


const MainContainer = styled.View`
  height: ${({ height }) => perfectHeight(height)}px;
`