import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface DiaryProps {
}

export interface DiaryState {
}

export default class DiaryComponent extends React.Component<DiaryProps, DiaryState> {
  constructor(props: DiaryProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View>
         <Text>Diary Component</Text>
      </View>
    );
  }
}
