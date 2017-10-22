import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './src/components/login/Login';
import Home from './src/components/main/Main';

const NavigationApp = StackNavigator({
    Login: {screen: Login},
    Home: {screen: Home}
  }, {
      navigationOptions: {
        header: false,
      }
  }
);

export default class App extends Component<{}> {
  render() {
    return (
      <NavigationApp/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
