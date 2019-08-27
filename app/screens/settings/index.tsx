import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

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
      <View>
         <Text>Settings Component</Text>
      </View>
    );
  }
}
