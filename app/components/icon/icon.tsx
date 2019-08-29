import * as React from "react"
import { View, Image, ImageStyle } from "react-native"
import { IconProps } from "./icon.props"
import { icons } from "./icons"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonicIcon from 'react-native-vector-icons/Ionicons'

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props
  const style: ImageStyle = { ...ROOT, ...styleOverride}

  if (props.fontAwesomeIconName) {
    return (
      <View style={containerStyle}>
        <FontAwesome style={{ marginTop: 15}}  size={20} name={props.fontAwesomeIconName} color={"white"} />
      </View>
    )
  }


  if(props.IonicIconName){
    return (
      <View style={containerStyle}>
        <IonicIcon style={style} name={props.fontAwesomeIconName} />
      </View>
    )
  }

  return (
    <View style={containerStyle}>
      <Image style={style} source={icons[icon]} />
    </View>
  )
}
