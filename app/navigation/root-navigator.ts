import { createStackNavigator } from "react-navigation"
import TabBarNavigation from "./tab-bar-navigation"

export const RootNavigator = createStackNavigator(
  {
    tabar: { screen: TabBarNavigation },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
