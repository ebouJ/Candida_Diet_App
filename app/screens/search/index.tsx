import * as React from 'react';
import { View, StyleSheet, Text, SectionList } from 'react-native';
import   { Header  } from '../../components/header'
import { Screen } from '../../components/screen'


export interface FoodListProps {
}

export interface FoodListState {
}

export default class FoodListComponent extends React.Component<FoodListProps, FoodListState> {
  constructor(props: FoodListProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <Screen preset="fixed" unsafe={true}>
          <Header headerText="Food List" style ={{ backgroundColor: 'red'}} />
         <SectionList
  renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
  renderSectionHeader={({section: {title}}) => (
    <Text style={{fontWeight: 'bold'}}>{title}</Text>
  )}
  sections={[
    {title: 'Title1', data: ['item1', 'item2']},
    {title: 'Title2', data: ['item3', 'item4']},
    {title: 'Title3', data: ['item5', 'item6']},
  ]}
  keyExtractor={(item, index) => item + index}
/>
      </Screen>
    );
  }
}
