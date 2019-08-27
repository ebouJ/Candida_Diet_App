import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

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
      <View>
         <Text>Recipes Component</Text>
      </View>
    );
  }
}
