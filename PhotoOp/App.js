import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// import the different screens
import Loading from './src/login/Loading.js'
import SignUp from './src/login/SignUp.js'
import Login from './src/login/Login.js'
import Main from './src/login/Main.js'
import Home from './src/Home.js'
import Boa from './src/locations/BoardwalkMural.js'
import Nat from './src/locations/NaturalBridges.js'
import Por from './src/locations/PorterSquiggle.js'
import Sea from './src/locations/Seabright.js'


import firebase from 'react-native-firebase'

const AppNavigator = createStackNavigator(
  {
    Loading,
    SignUp,
    Login,
    Home,
    Boa,
    Nat,
    Por,
    Sea,
  },
  {
      initialRouteName: 'SignUp'
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
