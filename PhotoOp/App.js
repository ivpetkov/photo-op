/*
import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

// home page before navigation
import List from './screens/List.js'
import Header from './screens/Header.js'

const App = () => {
   return (
     <ScrollView>
        <Header />
        <List />
      </ScrollView>
   )
}
export default App
*/

import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Location 1"
          onPress={() => this.props.navigation.navigate('Details1')}
        />
        <Button
          title="Location 2"
          onPress={() => this.props.navigation.navigate('Details2')}
        />
        <Button
          title="Location 3"
          onPress={() => this.props.navigation.navigate('Details3')}
        />
      </View>
    );
  }
}

class DetailsScreen1 extends React.Component {
  static navigationOptions = {
    title: 'Location 1 Details',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen2 extends React.Component {
  static navigationOptions = {
    title: 'Location 2 Details',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen3 extends React.Component {
  static navigationOptions = {
    title: 'Location 3 Details',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details1: DetailsScreen1,
    Details2: DetailsScreen2,
    Details3: DetailsScreen3,
  },
  {
    initialRouteName: 'Home',

    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f765b1',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 16,
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
