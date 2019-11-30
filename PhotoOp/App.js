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
import Favorites from './src/Favorites.js'
import FavoritesDetails from './src/FavoritesDetails.js'

console.disableYellowBox = true; 

const AppNavigator = createStackNavigator(
  {
    Loading,
    SignUp,
    Login,
    Home,
    LocationDetails,
    Favorites,
    FavoritesDetails,
  },
  {
      initialRouteName: 'Login'
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

var config = {
    databaseURL: "https://photo-op-2.firebaseio.com/likedPlaces/Jr49muZZibGVa3LbjoVi",
    projectId: "photo-op-2",
};

firebase.initializeApp(config);
