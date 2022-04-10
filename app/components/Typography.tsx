import React from 'react'
import { TextStyle } from 'react-native'
import styled from 'styled-components/native'
import { perfectFont, perfectWidth } from '../utils/commonFunctions'
import { palette } from '../theme/palette'

type TypographyProps = {
  text?: string
  size?: number
  maxChar?: number
  noLimit?: boolean
  isRequired?: boolean
} & TextStyle

const Typography: React.FC<TypographyProps> = ({
  text,
  color = palette.black,
  size = 16,
  // fontFamily,
  noLimit,
  maxChar = 50,
  isRequired,
  ...props
}: TypographyProps) => {
  return (
    <Row>
      <Text size={perfectFont(size)}
        // fontFamily={fontFamily}
        color={color} style={{ ...props }}>
        {noLimit
          ? text
          : text !== undefined && (text.length >= maxChar ? text.slice(0, maxChar) + '...' : text)}
      </Text>
      {isRequired && (
        <Text
          size={perfectFont(20)}
          // fontFamily={fontFamily}
          color={palette.angry}
          style={{ marginLeft: perfectWidth(1) }}
        >
          *
        </Text>
      )}
    </Row>
  )
}

export default Typography

type TextProps = {
  color?: string
  size: number
  fontFamily?: string
  textAlign?: string
  [anyOtherProp: string]: any
}

const Text = styled.Text<TextProps>`
  /* font-family: ${props => props.fontFamily}; */
  font-size: ${props => props.size}px;
  color: ${props => props.color};
  padding-top: 3px;
  padding-bottom: 3px;
  text-align: left;
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`}
`

const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
`
