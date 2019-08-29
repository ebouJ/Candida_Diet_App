import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import   { Header  } from '../../components/header'
import { Screen } from '../../components/screen'

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
      <Screen preset="fixed" unsafe={true}>
          <Header headerText="Diary"  />
      </Screen>
    );
  }
}
