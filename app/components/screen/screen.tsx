import * as React from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from "react-native"
import { SafeAreaView } from "react-navigation"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { isIphoneX } from 'react-native-iphone-x-helper'
import LinearGradient from "react-native-linear-gradient";
const Rainbow = require('rainbowvis.js');


const numberOfItems = 9;
const rainbow = new Rainbow();
rainbow.setNumberRange(1, numberOfItems);
rainbow.setSpectrum('#334d50', '#cbcaa5');

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const preset = presets["fixed"]
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}

  const ViewMode = (<View style={[preset.outer, backgroundStyle]}>
    <ScrollView
      style={[preset.outer, backgroundStyle]}
      contentContainerStyle={[preset.inner, style]}>
      {props.children}
    </ScrollView>
  </View>)

  const SafeArea = (
    <React.Fragment>
      <LinearGradient
        colors={[...Array(9).keys()].map((i) => '#' + rainbow.colourAt(i))}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      >
        <SafeAreaView style={{ flex: 0 }} />
      </LinearGradient>
      <ScrollView
        style={[preset.outer, backgroundStyle]}
        contentContainerStyle={[preset.inner, style]}>
        {props.children}
      </ScrollView>
    </React.Fragment>
  )

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}>
      <StatusBar barStyle={props.statusBar || "light-content"} />
      {isIphoneX() ? SafeArea : ViewMode}
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const preset = presets["scroll"]
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}

  const ViewMode = (<View style={[preset.outer, backgroundStyle]}>
    <ScrollView
      style={[preset.outer, backgroundStyle]}
      contentContainerStyle={[preset.inner, style]}>
      {props.children}
    </ScrollView>
  </View>)

  const SafeArea = (

    <React.Fragment>
      <LinearGradient
        colors={[...Array(9).keys()].map((i) => '#' + rainbow.colourAt(i))}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      >
        <SafeAreaView style={{ flex: 0 }} />
      </LinearGradient>
      <ScrollView
        style={[preset.outer, backgroundStyle]}
        contentContainerStyle={[preset.inner, style]}>
        {props.children}
      </ScrollView>
    </React.Fragment>

  )

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}>
      <StatusBar barStyle={props.statusBar || "light-content"} />
      {isIphoneX() ? SafeArea : ViewMode}
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
