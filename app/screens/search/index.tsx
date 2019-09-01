import * as React from 'react';
import { View, FlatList, Text, ViewStyle, Dimensions } from 'react-native';
import { Header } from '../../components/header'
import { Screen } from '../../components/screen'
import Data from '../../../candidaInfo.json'
import { FoodList } from '../../models/firebase/food_list'
const { width } = Dimensions.get('window')

import { observer, inject } from 'mobx-react';


export interface FoodListProps {
  foodlistStore: FoodList
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
  borderBottomColor: 'gray',
  borderBottomWidth: 1
}
@inject("navigationStore", "foodlistStore")
@observer
export default class FoodListComponent extends React.Component<FoodListProps, FoodListState> {
  constructor(props: FoodListProps) {
    super(props);
    this.state = {
      data : [],
      searchTerm: ''
    };
  }

  onTextChange = (searchTerm: string) => {
      this.setState({ searchTerm })
  }

  Status = (allowed: string) => {


      return (
         <View style={{ width: width / 5, backgroundColor: allowed ? '#90ee90' : '#ff726f' , height: 35, justifyContent: 'center', alignItems: 'center'}}>
              <Text>{allowed ? 'Allowed' : 'Avoid'}</Text>
        </View>
      )
  }

  renderItem = ({ item }) => {
    
      return (
         <View style={[BaseFlatListItem]}>
            <Text style={{ fontFamily: 'roboto', fontSize: 15, textAlign: 'center'}}>{item.name}</Text>
            {this.Status(item.allowed)}
         </View>
      )
  }

  public render() {
    const { searchTerm} = this.state
    const { foodlistStore : { list } } = this.props
    return (
      <Screen preset="fixed" >
         <Header headerText={"Food List"} searchable  onTextChange={this.onTextChange} /> 
         <FlatList 
            data={list.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))}
            renderItem={this.renderItem}
        />
      </Screen>
    );
  }
}
