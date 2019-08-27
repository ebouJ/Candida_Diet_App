import { createBottomTabNavigator } from 'react-navigation';
import Home from '../screens/home'
import Recipes from '../screens/recipes'
import Search from '../screens/search'
import Settings from '../screens/settings'
import Diary from '../screens/diary'

export default createBottomTabNavigator(
  {
    home: Home,
    search: Search,
    diary: Diary,
    recipes: Recipes,
    settings: Settings,
  }
);