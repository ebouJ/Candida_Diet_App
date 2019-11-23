import * as React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Header } from '../../components/header'
import { Screen } from '../../components/screen'
import Data from '../../../recipes.json'
import firebase, { firestore } from 'react-native-firebase'
import { IMAGES } from '../../../images/index'
import MoreComponent from '../../components/morecomponent'
import { NavigationScreenProps } from 'react-navigation';
const { width, height } = Dimensions.get('window')







export interface SettingsProps extends NavigationScreenProps<{}>  {
}

export interface SettingsState {
}

export default class SettingsComponent extends React.Component<SettingsProps, SettingsState> {
  constructor(props: SettingsProps) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {

    // const data = ['breakfast','dinner','lunch']


    // data.forEach(type => {
    //    const res = Data[type]



    //     res.forEach(item => {
    //       const ref = firestore().collection('recipes').doc()
    //       firestore().collection('recipes').doc(ref.id).set( {
    //         id: ref.id,
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
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header headerText={"Moree"} />
        <ScrollView>
          <View style={styles.imageView} />
          <View style={styles.shadow} />
          <MoreComponent
            text={"Notification"}
            firstIcon={"md-notifications"}
            secondIcon={"angle-right"}
            onPress={() => navigate("notification")}
          />
          <View style={styles.shadowV} />
          <MoreComponent
            text={"Trigger List"}
            firstIcon={"md-filing"}
            secondIcon={"angle-right"}
            onPress={() => navigate("postJob")}
          />
          <View style={styles.border} />
          <MoreComponent
            text={"Friendly list"}
            firstIcon={"md-briefcase"}
            secondIcon={"angle-right"}
            onPress={() => navigate("companyProfile")}
          />

          <View style={styles.border} />
          <View
            style={{
              flexDirection: "row",
              flex: 1
            }}
          >
            <View style={{ flex: 8.5 }}>
              <TouchableWithoutFeedback>
                <MoreComponent
                  text={"Scan a food Item"}
                  firstIcon={"md-switch"}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.shadow} />
          <MoreComponent
            text={"Settings"}
            firstIcon={"md-cog"}
            secondIcon={"angle-right"}
            onPress={() => navigate("settings")}
          />
          <View style={styles.shadowV} />
          <MoreComponent text={"Invite"} secondIcon={"angle-right"} />
          <View style={styles.border} />
          <MoreComponent text={"Review Candida App"} secondIcon={"angle-right"} />
          <View style={styles.border} />
          <MoreComponent
            text={"Request for a new feature"}
            secondIcon={"angle-right"}
            onPress={() => navigate("requestFeature")}
          />
          <View style={styles.border} />
          <MoreComponent
            text={"Report App Bug"}
            secondIcon={"angle-right"}
            onPress={() => navigate("appBugReport")}
          />
          <View style={styles.shadow} />
          <MoreComponent text={"Sign Out"} firstIcon={"md-log-out"} />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC"
    //  backgroundColor: "black"
  },
  imageView: {
    height: height / 6
  },
  header: {
    height: 60,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15
  },
  text: {
    // color: "white",
    //fontFamily: "Roboto",
    //fontWeight: "bold",
    fontSize: 16
  },
  shadow: {
    height: 40,
    backgroundColor: "#F1F1F1",
    marginTop: 8
  },
  shadowV: {
    height: 60,
    backgroundColor: "#F1F1F1",
    marginTop: 15
  },
  signOut: {
    justifyContent: "center",
    alignItems: "center"
  },
  border: {
    borderBottomWidth: 1,
    borderColor: "#D3D3D3",
    paddingTop: 10
  }
});