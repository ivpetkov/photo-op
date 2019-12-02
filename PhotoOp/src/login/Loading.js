/*
  Loading screen that determines whether to take user to home screen or sign up screen
  If user is logged in, go to home screen
  If user is not logged in, go to sign up screen
*/

import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'

export default class Loading extends React.Component {

  // Background color and text color of navigation header
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#f067ae',
    },
    headerTintColor: '#fff',
  };

  // When component mounts, check if user is logged in
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'SignUp')
    })
  }

  // When component renders, return ActivityIndicator
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff"/>
      </View>
    )
  }
}

// styles for ActivityIndicator
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f067ae',
  }
})
