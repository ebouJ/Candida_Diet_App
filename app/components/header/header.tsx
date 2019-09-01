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
  backgroundColor: 'transparent',
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export class Header extends React.PureComponent<HeaderProps, {}> {

  render() {
    const {
      headerText,
      headerTx,
      searchable,
      onTextChange,
      leftIcon,
      onLeftPress,
      sortLabel
    } = this.props
    const header = headerText || (headerTx && translate(headerTx)) || ""

    const labels = ['All','Diary','Fruits','Meat']

    return (
      <LinearGradient
        colors={[...Array(9).keys()].map((i) => '#' + rainbow.colourAt(i))}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      >
        <Toolbar
          centerElement={header}
          leftElement={leftIcon}
          onLeftElementPress={onLeftPress}
           searchable={ searchable && {
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: (txt) => onTextChange(txt)
          }}
          rightElement={ searchable && {
            menu: {
                icon: "more-vert",
                labels: labels
            }
        }}
        onRightElementPress={ ({ index }) => sortLabel(labels[index])}
                    
          style={{ container: { ...ROOT } }}
        />
      </LinearGradient>
    )
  }
}