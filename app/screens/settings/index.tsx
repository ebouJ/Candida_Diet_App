import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Header } from '../../components/header'
import { Screen } from '../../components/screen'


export interface SettingsProps {
}

export interface SettingsState {
}

export default class SettingsComponent extends React.Component<SettingsProps, SettingsState> {
  constructor(props: SettingsProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <Screen preset="fixed" unsafe={true}>
        <Header headerText="Home" />
      </Screen>
    );
  }
}
