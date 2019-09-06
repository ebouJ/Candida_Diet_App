import * as React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Header } from '../../components/header'
import { Screen } from '../../components/screen'
import Data from '../../../recipes.json'
import firebase, { firestore } from 'react-native-firebase'
import { IMAGES } from '../../../images/index'







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

  componentWillMount(){

      // const data = ['breakfast','dinner','lunch']


      // data.forEach(type => {
      //    const res = Data[type]

         

      //     res.forEach(item => {
      //       const ref = firestore().collection('recipes').doc()
      //       firestore().collection('recipes').doc(ref.id).set( {
      //         name: item.name,
      //         prep_time: item.prep_time,
      //         cook_time: item.cook_time,
      //         total_time: item.total_time,
      //         calories: item.calories,
      //         ingridients: item.ingridients,
      //         instructions: item.instructions,
      //         recipe_cat: type,
      //         picture_url: item.picture_url,
      //       })
      //     })
      // })
  }

  public render() {
    return (
      <Screen preset="fixed" unsafe={true}>
        <Header headerText="Settings" />

      </Screen>
    );
  }
}
