

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {createStackNavigator,createAppContainer} from 'react-navigation'

import Notepad from './screens/notepad'

export default class App extends Component {
  
  render() {
    const stackNavigator = createStackNavigator({
      Profile:{
        screen:Notepad
      }
    });

    const App = createAppContainer(stackNavigator)
    return (
      <App/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
