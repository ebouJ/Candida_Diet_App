import * as React from 'react';
import { Header } from '../../components/header'
import { Screen } from '../../components/screen'


export interface AppProps {
}

export interface AppState {
}

export default class Home extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <Screen preset="fixed" unsafe={true}>
        <Header headerText="Home" />
        
      </Screen>
    );
  }
}
