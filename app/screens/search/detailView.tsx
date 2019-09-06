import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import { FoodList } from '../../models/firebase/food_list';
import { Dimensions, ScrollView, ImageBackground, View, Text, TouchableHighlight } from 'react-native';
import { IMAGES } from '../../../images';
import { IconToggle } from 'react-native-material-ui';
import { Icon } from '../../components/icon'
import { Storage } from '../../models/storage';
const { height, width } = Dimensions.get('window')

export interface DetailFoodViewProps extends NavigationScreenProps<{}> {
    foodlistStore: FoodList,
    storageStore: Storage
}
export interface State {
    yesSets: Set<string>,
    noSets:  Set<string>
}
@inject("navigationStore", "foodlistStore", "storageStore")
@observer
export default class DetailFoodView extends React.Component<DetailFoodViewProps, State> {
    constructor(props: DetailFoodViewProps) {
        super(props);
    }

    componentWillMount(){
        const {  storageStore: { yesVotes, noVotes } } = this.props
        const yesSets = new Set<string>(yesVotes)
        const noSets = new Set<string>(noVotes)
        this.setState({
            yesSets,
            noSets 
        })
    }





    yesClick = () => {
        const { foodlistStore: { selected }, storageStore: { yesVotes, noVotes } } = this.props
        const exist = yesVotes.find(item => item == selected.id)
        if(exist)  return;


        this.props.storageStore.addKey(selected.id, 'yesVotes')

        // Update and re-render
        const yesSets = new Set<string>(yesVotes)
        const noSets = new Set<string>(noVotes)
        noSets.delete(selected.id)
        this.setState({ yesSets ,noSets})
    }

    noClick = () => {
    
        const { foodlistStore: { selected }, storageStore: { noVotes, yesVotes } } = this.props
        const exist = noVotes.find(item => item == selected.id)
        if(exist)  return;



        this.props.storageStore.addKey(selected.id, 'noVotes') 
        
        
        const yesSets = new Set<string>(yesVotes)
        const noSets = new Set<string>(noVotes)

        yesSets.delete(selected.id)
        this.setState({ noSets, yesSets })
    }

    public render() {
        const { foodlistStore: { selected : { id , name, desc} } } = this.props
        const { yesSets, noSets} = this.state

        const source = IMAGES[name.toLowerCase()]
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
                        <Text style={{ fontFamily: 'roboto', fontSize: 30, paddingTop: 5 }}>{name}</Text>
                            <Text style={{ fontFamily: 'roboto', fontSize: 18, maxWidth: width - 10 }}>{desc}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
                        <Text>{`How well did you tolarate ${name}`}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableHighlight onPress={() => this.yesClick()}> 
                                < Icon fontAwesomeIconName={"thumbs-up"} color={yesSets.has(id) ?'green' : 'gray'} size={25} />
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this.noClick()}>
                                <Icon fontAwesomeIconName={"thumbs-down"} color={noSets.has(id) ?'red' : 'gray'} size={25} />
                            </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
