// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'

export default class Loading extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#f067ae',
    },
    headerTintColor: '#fff',
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'SignUp')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f067ae',
  }
})
