import * as React from "react"
import { ActivityIndicator } from "react-native"
import styled from "styled-components/native"
import { color } from "../../theme"
import { perfectHeight, perfectWidth } from "../../utils/commonFunctions"
import Typography from "../Typography"
import { ButtonProps } from "./button.props"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    width,
    height,
    backgroundColor,
    borderColor,
    onPress,
    textColor = color.palette.white,
    text,
    loader = false,
    outline,
    disabled,
    size,
  } = props


  return (
    <>
      <ButtonContainer
        width={width}
        height={height}
        borderColor={borderColor}
        backgroundColor={backgroundColor}
        onPress={onPress}
        disabled={disabled ? true : !!loader}
        loader={loader}
        outline={outline}
        {...props}
      >
        {loader ? (
          <ActivityIndicator size='small' color={color.palette.white} />
        ) : (
          <Typography
            color={textColor}
            text={text}
            size={size}
            textTransform={'uppercase'}
            textAlign={'center'}
          />
        )}
      </ButtonContainer>
    </>
  )
}


const ButtonContainer = styled.TouchableOpacity`
  width: ${p => (p.width ? perfectWidth(p.width) : perfectWidth(80))}px;
  height: ${p => (p.height ? perfectHeight(p.height) : perfectHeight(7))}px;
  background-color: ${({ loader, outline, disabled }) => handleColorType(loader, outline, disabled)};
  align-self: ${p => (p.alignSelf ? p.alignSelf : 'center')};
  justify-content: center;
  align-items: center;
  border-radius: ${perfectWidth(2)}px;
  border-color: ${p => (p.borderColor ? p.borderColor : p.theme.secondary)};
  border-width: ${p => (p.outline ? perfectWidth(0.2) : perfectWidth(0))}px;
`

const handleColorType = (loader, outline, disabled) => {
  if (loader) {
    return color.palette.lightGrey;
  } else if (outline) {
    return 'transparent';
  } else if (disabled) {
    return color.palette.lightGrey;
  } else {
    return color.palette.redDarker;
  }
};

