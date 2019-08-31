import * as React from 'react';
import { View, FlatList, Text, ViewStyle } from 'react-native';
import { Header } from '../../components/header'
import { Screen } from '../../components/screen'
import Data from '../../../candidaInfo.json'
import { firestore } from 'react-native-firebase'

export interface FoodListProps {
}

export interface FoodListState {
  data: any,
  searchTerm: string
}


const BaseFlatListItem : ViewStyle = {
  height: 40, 
  alignItems: 'center', 
  justifyContent: 'space-between', 
  flexDirection: 'row', 
  margin: 10, 
}

export default class FoodListComponent extends React.Component<FoodListProps, FoodListState> {
  constructor(props: FoodListProps) {
    super(props);
    this.state = {
      data : [],
      searchTerm: ''
    };
  }

   componentWillMount(){
    const { diary  } = Data
    

    const allowed = diary.allowed.map( item => {
           return {
             name: item.name,
             desc: item.descrption,
             cat: diary.name,
             allowed: true
           }
    })

    const notAllowed = diary.notAllowed.map(item => {
      return {
        name: item.name,
        desc: item.descrption,
        cat: diary.name,
        allowed: false
      }
    })




    this.setState({ data: [...allowed,...notAllowed]})
        

  }

  onTextChange = (searchTerm: string) => {
      this.setState({ searchTerm })
  }


  renderItem = ({ item }) => {
    
      return (
         <View style={[BaseFlatListItem]}>
            <Text style={{ fontFamily: 'roboto', fontSize: 15, textAlign: 'center'}}>{item.name}</Text>
            <Text>{item.allowed ? 'allowed' : 'notallowed'}</Text>
         </View>
      )
  }

  public render() {
    let { data , searchTerm} = this.state


    const len = data.length

    const suffle = []

    const set = new Set()
    while(suffle.length !== len){
      const index = Math.floor(Math.random() * 8)
      if(set.has(index)) continue;
      suffle.push(data[index])
      set.add(index)
    }
    return (
      <Screen preset="fixed" >
         <Header headerText={"Food List"} searchable  onTextChange={this.onTextChange} /> 
         <FlatList 
            data={suffle.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))}
            renderItem={this.renderItem}
        />
      </Screen>
    );
  }
}
