import * as React from "react"
import { ImageStyle, TouchableOpacity, Image } from "react-native"
import { IconProps } from "./icon.props"
import { icons } from "./icons"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props

  return (
    <TouchableOpacity style={containerStyle} {...props}>
      <Image style={[ROOT, styleOverride]} source={icons[icon]} />
    </TouchableOpacity>
  )
}
