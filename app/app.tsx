// Welcome to the main entry point of the app.
//
// In this file, we'll be kicking off our app or storybook.

import "./i18n"
import * as React from "react"
import { StatefulNavigator } from "./navigation"
import CodePush from 'react-native-code-push'
import { RootStore, setupRootStore } from "./models/root-store"
import { Provider } from "mobx-react"
import { BackButtonHandler } from "./navigation/back-button-handler"
import { contains } from "ramda"
import { DEFAULT_NAVIGATION_CONFIG } from "./navigation/navigation-config"


console.disableYellowBox = true;

interface AppState {
  rootStore?: RootStore
}

/**
 * This is the root component of our app.
 */
 class App extends React.Component<{}, AppState> {
  /**
   * When the component is mounted. This happens asynchronously and simply
   * re-renders when we're good to go.
   */
  async componentDidMount() {
    this.setState({
      rootStore: await setupRootStore(),
    })
    
  }

  /**
   * Are we allowed to exit the app?  This is called when the back button
   * is pressed on android.
   *
   * @param routeName The currently active route name.
   */
  canExit(routeName: string) {
    return contains(routeName, DEFAULT_NAVIGATION_CONFIG.exitRoutes)
  }

  render() {
    const rootStore = this.state && this.state.rootStore

    // Before we show the app, we have to wait for our state to be ready.
    // In the meantime, don't render anything. This will be the background
    // color set in native by rootView's background color.
    //
    // This step should be completely covered over by the splash screen though.
    // You're welcome to swap in your own component to render if your boot up
    // sequence is too slow though.
    if (!rootStore) {
      return null
    }

    // otherwise, we're ready to render the app

    // --- am: begin list of stores ---
    const otherStores = {
      foodlistStore: rootStore.foodList,
      storageStore: rootStore.storage,
      recipes: rootStore.recipes
    }
    // --- am: end list of stores ---

    return (
      <Provider rootStore={rootStore} navigationStore={rootStore.navigationStore} {...otherStores}>
        <BackButtonHandler canExit={this.canExit}>
          <StatefulNavigator />
        </BackButtonHandler>
      </Provider>
    )
  }
}

/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */

 const codePushConfig = {
   checkFrequency: CodePush.CheckFrequency.ON_APP_START
 }


 export default CodePush(codePushConfig)(App)

