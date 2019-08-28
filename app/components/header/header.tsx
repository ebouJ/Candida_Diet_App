import * as React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button"
import { Icon } from "../icon"
import { Text } from "../text"
import { spacing } from "../../theme"
import { translate } from "../../i18n/"
import LinearGradient from "react-native-linear-gradient";

import { ifIphoneX } from 'react-native-iphone-x-helper'

/*
This is use to generate colors for the linear gradient
*/
const Rainbow = require('rainbowvis.js');
const numberOfItems = 9;
const rainbow = new Rainbow();
rainbow.setNumberRange(1, numberOfItems);
rainbow.setSpectrum('#334d50', '#cbcaa5');

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  paddingTop: spacing[5],
  paddingBottom: spacing[5],
  justifyContent: "flex-start",
}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: 32 }
const RIGHT: ViewStyle = { width: 32 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export class Header extends React.Component<HeaderProps, {}> {

  render() {
    const {
      onLeftPress,
      onRightPress,
      rightIcon,
      leftIcon,
      headerText,
      headerTx,
      titleStyle,
    } = this.props
    const header = headerText || (headerTx && translate(headerTx)) || ""



    return (
      <LinearGradient
        colors={[...Array(9).keys()].map((i) =>  '#' + rainbow.colourAt(i))}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      >
        <View style={{ ...ROOT, ...this.props.style }}>
          {leftIcon ? (
            <Button preset="link" onPress={onLeftPress}>
              <Icon icon={leftIcon} />
            </Button>
          ) : (
              <View style={LEFT} />
            )}
          <View style={TITLE_MIDDLE}>
            <Text style={{ ...TITLE, ...titleStyle, paddingTop: ifIphoneX ? 10 : null }} text={header} />
          </View>
          {rightIcon ? (
            <Button preset="link" onPress={onRightPress}>
              <Icon icon={rightIcon} />
            </Button>
          ) : (
              <View style={RIGHT} />
            )}
        </View>
      </LinearGradient>
    )
  }
}