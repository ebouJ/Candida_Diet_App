import * as React from 'react';
import { Screen } from '../../components/screen'
import { Header } from '../../components/header'
import { NavigationScreenProps } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { FoodList } from '../../models/firebase/food_list';
import { Dimensions, ScrollView, ImageBackground, View, Text } from 'react-native';
import { IMAGES } from '../../../images';
import { IconToggle } from 'react-native-material-ui';
import { Icon } from '../../components/icon'
const { height, width } = Dimensions.get('window')

export interface DetailFoodViewProps extends NavigationScreenProps<{}> {
    foodlistStore: FoodList
}
@inject("navigationStore", "foodlistStore")
@observer
export default class DetailFoodView extends React.PureComponent<DetailFoodViewProps, any> {
    constructor(props: DetailFoodViewProps) {
        super(props);
    }

    public render() {
        const { foodlistStore: { selected } } = this.props
        const source = IMAGES[selected.name.toLowerCase()]
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={source} style={{ width: width, height: height / 3, flex: 1 }} resizeMode={"cover"}>
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
                        <Text style={{ fontFamily: 'roboto', fontSize: 30, paddingTop: 5 }}>{selected.name}</Text>
                        <View style={{  margin: 5, borderRadius: 25, backgroundColor:  '#E8E8E8'}}>
                             <Text style={{ fontFamily: 'roboto', fontSize: 16, maxWidth: width - 10 }}>{selected.desc}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
                        <Text>{`How well did you tolarate ${selected.name}`}</Text>
                        <View style={{ flexDirection: 'row'}}>
                            <Icon fontAwesomeIconName={"thumbs-up"} color={'gray'} size={25} />
                            <Icon fontAwesomeIconName={"thumbs-down"} color={'red'} size={25} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
