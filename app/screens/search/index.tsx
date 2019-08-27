import * as React from 'react';
import { StyleSheet, Text, SectionList } from 'react-native';
import   { Header  } from '../../components/header'
import { Screen } from '../../components/screen'

import firebase from 'react-native-firebase';




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
    firebase.auth()
    .signInAnonymously()
    .then(credential => {
      if (credential) {
        console.log('default app user ->', credential.user.toJSON());
      }
    }).catch(err => console.log(err));
    return (
      <Screen preset="fixed" unsafe={true}>
          <Header headerText="Food List"  />
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
