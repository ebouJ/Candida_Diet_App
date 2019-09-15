import * as React from 'react';
import { View, Text, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Header } from '../../components/header'
import { Screen } from '../../components/screen'
import Card from '../../components/card'
import { Recipes } from '../../utils/constants'
import { inject, observer } from 'mobx-react';
import { RecipeList } from '../../models/firebase/recipes'
import { NavigationScreenProps } from 'react-navigation'
//import Details from './recipesScreen'

//console.log(Details)
const { width } = Dimensions.get('window')

export interface RecipesProps extends NavigationScreenProps<{}>  {
  recipes: RecipeList
}

export interface RecipesState {
  current: string
  //'breakfast' | 'lunch' | 'dinner'
}

@inject("navigationStore", "recipes")
@observer
export default class RecipesComponent extends React.PureComponent<RecipesProps, RecipesState> {
  constructor(props: RecipesProps) {
    super(props);
    this.state = {
      current: 'breakfast'
    };
  }

  renderItem = ({ item: { title, image } }: any) => {

    return (
      <View style={{ marginTop: 15 }}>
        <Card title={title} image={image} onPress={() => this.renderRecipes(title)} />
      </View>
    )
  }

  navigate = (item: typeof RecipeList.Type) => {

    this.props.recipes.setSelectedItem(item)
    //this.props.navigation.navigate('detailRecipe')
  }


  renderVerticalFlatList = ({ item }: any) => {
    return (
      <TouchableWithoutFeedback onPress={ () => this.navigate(item)}>
        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.5, height: 30, margin: 15 }}>
          <Text style={{ fontFamily: 'roboto', fontSize: 15, maxHeight: width - 10 }}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  getFlatListData = (type: string) => {
    return this.props.recipes[type]

  }

  renderRecipes = (title: string) => {
    this.setState({ current: title.toLowerCase() })
  }
  public render() {

    const { current } = this.state

    const data = this.getFlatListData(current)
    
  
   

    return (
      <Screen preset="fixed" unsafe={true}>
        <Header headerText="Recipes" />

        <Text style={
          { fontFamily: 'roboto', fontSize: 14, fontWeight: '400', margin: 20 }
        }>Meal Recipes</Text>
        <View>
          <FlatList
            data={Recipes}
            contentContainerStyle={{ display: 'flex' }}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
            horizontal
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text>{current.toUpperCase()}</Text>
          <FlatList
            data={data && data.slice()}
            extraData={this.state}
            renderItem={(item) => this.renderVerticalFlatList(item)}
            ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
          />
        </View>
      </Screen>
    );
  }
}
