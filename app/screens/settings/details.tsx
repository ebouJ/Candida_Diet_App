import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { Dimensions, ScrollView, ImageBackground, View, Text } from 'react-native';
import { IMAGES } from '../../../images';
import { IconToggle } from 'react-native-material-ui';
import {  RecipeList  } from '../../models/firebase/recipes'
const { height, width } = Dimensions.get('window')

export interface DetailRecipeViewProps extends NavigationScreenProps<{}> {
    recipe: RecipeList
}
export interface State {

}
export default class DetailRecipeView extends React.Component<DetailRecipeViewProps, State> {
    constructor(props: DetailRecipeViewProps) {
        super(props);
    }

    public render() {
        const {  } = this.props
        
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={require('')} style={{ width: width, height: height / 3, flex: 1 }} resizeMode={"cover"}>
                    <View style={{ paddingTop: height / width + 10, zIndex: 1 }}>
                        <IconToggle name="arrow-back" color="white" size={30} onPress={() => this.props.navigation.goBack()} />
                    </View>
                </ImageBackground>
                <ScrollView style={{
                    position: 'absolute',
                    backgroundColor: '#F9F8FD',
                    top: height / 3.5,
                    height: height,
                    width: width,
                    zIndex: 1,
                    flex: 1,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                }}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'roboto', fontSize: 30, paddingTop: 5 }}>{}</Text>
                            <Text style={{ fontFamily: 'roboto', fontSize: 18, maxWidth: width - 10 }}>{}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}