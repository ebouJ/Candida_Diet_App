import * as React from "react"
import { ViewStyle } from "react-native"
import { HeaderProps } from "./header.props"
import { translate } from "../../i18n/"
import LinearGradient from "react-native-linear-gradient";
import { Toolbar } from 'react-native-material-ui';

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
  backgroundColor: 'none',
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export class Header extends React.Component<HeaderProps, {}> {

  render() {
    const {
      headerText,
      headerTx,
    } = this.props
    const header = headerText || (headerTx && translate(headerTx)) || ""



    return (
      <LinearGradient
        colors={[...Array(9).keys()].map((i) => '#' + rainbow.colourAt(i))}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      >
        <Toolbar
          centerElement={header}
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
          }}
          style={{ container: { ...ROOT } }}
        />
      </LinearGradient>
    )
  }
}