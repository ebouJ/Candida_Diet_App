import * as React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Header } from '../../components/header'
import { Screen } from '../../components/screen'
import Data from '../../../candidaInfo.json'
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

      // const data = ['diary','fruits','meat']


      // data.forEach(type => {
      //    const res = Data[type]

      //    console.log(res)

      //     res.allowed.forEach(item => {
      //       const ref = firestore().collection('food_list').doc()
      //       firestore().collection('food_list').doc(ref.id).set( {
      //         name: item.name,
      //         desc: item.descrption || '',
      //         cat: res.name,
      //         id: ref.id,
      //         allowed: true
      //       })
      //     })

      //     res.notAllowed.forEach(item => {
      //       const ref = firestore().collection('food_list').doc()
      //       firestore().collection('food_list').doc(ref.id).set( {
      //         name: item.name,
      //         desc: item.descrption || '',
      //         cat: res.name,
      //         id: ref.id,
      //         allowed: false
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
