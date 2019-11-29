import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import firebase from 'react-native-firebase'

import Loading from './src/login/Loading.js'
import SignUp from './src/login/SignUp.js'
import Login from './src/login/Login.js'
import Home from './src/Home.js'
import LocationDetails from './src/LocationDetails.js'

const AppNavigator = createStackNavigator(
  {
    Loading,
    SignUp,
    Login,
    Home,
    LocationDetails,
  },
  {
      initialRouteName: 'Home'
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
