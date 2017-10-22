import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Tasks from '../tasks/Tasks';
import History from '../history/History';

var MainScreenNavigator = TabNavigator({
    Tasks: {screen: Tasks},
    History: {screen: History}
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: 'grey',
      // activeBackgroundColor: 'darkblue',
      // inactiveTintColor: 'black',
      // inactiveBackgroundColor: 'blue',
      labelStyle: {
        fontSize: 12,
        padding: 0
      }
    }
});

MainScreenNavigator.navigationOptions = {
  title: "Tab example"
}

export default MainScreenNavigator;