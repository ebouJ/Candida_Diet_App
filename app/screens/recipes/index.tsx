import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Header } from '../../components/header'
import { Screen } from '../../components/screen'


export interface RecipesProps {
}

export interface RecipesState {
}

export default class RecipesComponent extends React.Component<RecipesProps, RecipesState> {
  constructor(props: RecipesProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <Screen preset="fixed" unsafe={true}>
        <Header headerText="Recipes" />
      </Screen>
    );
  }
}
