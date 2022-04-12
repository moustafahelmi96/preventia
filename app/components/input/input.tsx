import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { perfectHeight, perfectWidth } from "../../utils/commonFunctions"
import styled from "styled-components/native"
import Typography from "../Typography"

export interface InputProps {
  /**
   * An optional style override useful for padding & margin.
   */
  title: string
  placeholder: string
  keyboardType?: string
  secureTextEntry?: boolean
  onChangeText: any
  multiline?: boolean
  error?: string
  defaultValue?: string
}

/**
 * Describe your component here
 */
export const Input = observer(function Input(props: InputProps) {
  const { title, placeholder, keyboardType, multiline, error } = props

  return (
    <MainContainer>
      <TextContainer multiline={multiline}>
        <Typography text={title} width={"90%"} />
        <InputContainer
          {...props}
          keyboardType={keyboardType}
          placeholder={placeholder}
          multiline={multiline}
        />
      </TextContainer>
      {error && (
        <Typography
          color={color.palette.angry}
          text={error}
          size={12}
          marginTop={perfectHeight(1)}
        />
      )}
    </MainContainer>
  )
})

const MainContainer = styled.View`
  width: 100%;
`

const TextContainer = styled.View.attrs({
  shadowColor: "#000",
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
})`
  width: 100%;
  height: ${({ multiline }) => (multiline ? perfectHeight(20) : perfectHeight(9))}px;
  border-radius: ${perfectWidth(2)}px;
  align-self: center;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${color.palette.white};
`

const InputContainer = styled.TextInput`
  width: 90%;
  height: 50%;
`
