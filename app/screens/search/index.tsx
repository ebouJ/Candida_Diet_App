import * as React from 'react';
import { View, FlatList, Text, ViewStyle, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Header } from '../../components/header'
import { Screen } from '../../components/screen'
import { FoodList , FoodItem } from '../../models/firebase/food_list'
import { NavigationScreenProps } from "react-navigation"
const { width } = Dimensions.get('window')

import { observer, inject } from 'mobx-react';


export interface FoodListProps extends NavigationScreenProps<{}> {
  foodlistStore: FoodList
}

export interface FoodListState {
  data: any,
  searchTerm: string,
  labelFilter: string
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
export default class FoodListComponent extends React.PureComponent<FoodListProps, FoodListState> {
  constructor(props: FoodListProps) {
    super(props);
    this.state = {
      data : [],
      searchTerm: '',
      labelFilter: ''

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

  navigate = (item: typeof FoodItem.Type) => {
    this.props.foodlistStore.setSelectedItem(item)
    this.props.navigation.navigate('detail')
  }

  renderItem = ({ item }) => {
  
      return (
        <TouchableWithoutFeedback onPress={() => this.navigate(item)}>
         <View style={[BaseFlatListItem]}>
            <Text style={{ fontFamily: 'roboto', fontSize: 15, textAlign: 'center'}}>{item.name}</Text>
            {this.Status(item.allowed)}
         </View>
         </TouchableWithoutFeedback>
      )
  }
  componentWillMount(){
    const { foodlistStore : { list } } = this.props
    this.setState({ data: list})
  }

  filterByLabel = (labelFilter: any) => {
    const { foodlistStore : { list } } = this.props
    if(labelFilter === 'All') {
      this.setState({ data:  list } )
    } else if(labelFilter !== ''){
      this.setState({ data:  list.filter(item => item.cat === labelFilter) } )
    }
  }

  public render() {
    const { data, searchTerm } = this.state
    
    return (
      <Screen preset="fixed" >
         <Header headerText={"Food List"} searchable  onTextChange={this.onTextChange} sortLabel={this.filterByLabel} /> 
         <FlatList 
            data={data.filter( item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))}
            renderItem={this.renderItem}
        />
      </Screen>
    );
  }

}
