import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { Dimensions, ScrollView, ImageBackground, View, Text } from 'react-native';
import { IconToggle } from 'react-native-material-ui';
import { RecipeList } from '../../models/firebase/recipes'
import { IMAGES } from '../../../images';
import { Screen } from '../../components/screen'
const { height, width } = Dimensions.get('window')

export interface DetailRecipeViewProps extends NavigationScreenProps<{}> {
    recipes: RecipeList
}
export interface State {

}

@inject("recipes")
@observer
export default class DetailRecipeView extends React.Component<DetailRecipeViewProps, State> {
    constructor(props: DetailRecipeViewProps) {
        super(props);
    }

    public render() {
        const { recipes: { selected: { recipe_cat, name, calories, ingridients, instructions } } } = this.props


        return (
            <View style={{ flex: 1}} >
                <ImageBackground source={IMAGES[recipe_cat]} style={{ width: width, height: height / 3, flex: 1 }} resizeMode={"cover"}>
                    <View style={{ paddingTop: height / width + 10, zIndex: 1 }}>
                        <IconToggle name="arrow-back" color="white" size={30} onPress={() => this.props.navigation.goBack()} />
                    </View>
                </ImageBackground>
                <ScrollView style={{
                    position: 'absolute',
                    backgroundColor: '#F9F8FD',
                    top: height / 3.5,
                    height: height / 1.7,
                    flex: 1,
                    width: width,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                   
                }}
                >
                    <View style={{ flex: 1}}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'roboto', paddingTop: 5 }} adjustsFontSizeToFit={true} allowFontScaling >{name}</Text>
                    </View>
                    <View style={{ margin: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 18 }}>Ingridents</Text>
                        <Text style={{ fontFamily: 'roboto', fontSize: 16, color: '#32CD32' }}>{calories}</Text>
                    </View>
                    <View style={{ flex: 1}}>
                        {ingridients && ingridients.map((item, i) => 
                     
                                <View style={{ flexDirection: 'row', marginTop: 13, marginLeft: 13}}>
                                    <Text style={{ fontFamily: 'roboto', fontSize: 15, marginLeft: 4}}>{`${i+1}. ${item}`}</Text>
                                </View>
                            
                        )}
                    </View>
                    <View style={{ margin: 10, flexDirection: 'row' }}>
                    {instructions && <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 18 }}>Instructions</Text> }
                    </View>
                    <View style={{ flex: 1}}>
                        {instructions && instructions.map((item, i) => {
                            return (
                                <View style={{ flexDirection: 'row', marginTop: 13, marginLeft: 13}}>
                                    <Text style={{ fontFamily: 'roboto', fontSize: 16, maxWidth: width - 20, marginLeft: 4}}>{`${i+1}. ${item}`}</Text>
                                </View>
                            )
                        })}
                    </View>






                    { /*  A workaround for a bug in scroll view    */}
                     <View style={{ flex: 1}}>
                        {instructions && instructions.map((item, i) => {
                            return (
                                <View style={{ flexDirection: 'row', marginTop: 13, marginLeft: 13}}>
                                    
                                </View>
                            )
                        })}
                    </View> 
                    </View>
                </ScrollView>
            </View>
        );
    }
}