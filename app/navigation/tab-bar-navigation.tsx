import React from "react";
import Ionicons from 'react-native-vector-icons/FontAwesome';

import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import Home from '../screens/home'
import Recipes from '../screens/recipes'
import Search from '../screens/search'
import Settings from '../screens/settings'
import Diary from '../screens/diary'

import TabBar from './tabBar';


/* declaration of stacks */
const HomeStack = createStackNavigator({
  home: Home
},
{
  headerMode: "none",
  navigationOptions: { gesturesEnabled: false },
})
const RecipesStack = createStackNavigator({
  recipes: Recipes
},
{
  headerMode: "none",
  navigationOptions: { gesturesEnabled: false },
})
const SearchStack = createStackNavigator({
  search: Search
},
{
  headerMode: "none",
  navigationOptions: { gesturesEnabled: false },
})
const SettingsStack = createStackNavigator({
  settings: Settings
},
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  })
const DiaryStack = createStackNavigator({
  diary: Diary
},
{
  headerMode: "none",
  navigationOptions: { gesturesEnabled: false },
})

const Tabs = createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchStack,
    Diary: DiaryStack,
    Recipes: RecipesStack,
    Settings: SettingsStack,

  },{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'Recipes') {
          iconName = `star`;
        } else if (routeName === 'Search') {
          iconName = `search`;
        } else if (routeName === 'Settings') {
          iconName = `cog`;
        } else if (routeName === 'Diary') {
          iconName = `book`;
        }

        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    
    tabBarComponent: (props) => <TabBar {...props}/>,
    tabBarOptions: {
      //@ts-ignore
        tabFeatured: 'Diary',
        backgroundFeaturedIcon: '#334d50',
        activeFeaturedTintColor: 'skyblue',
        inactiveFeatureTintColor: 'white',
        showLabel: true,
        activeTintColor: '#334d50',
        inactiveTintColor: '#E1E3DB',
        style: {
            height: 80,
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#F2F3EF'
        },
        tabStyle: {}
    }
});

export default Tabs