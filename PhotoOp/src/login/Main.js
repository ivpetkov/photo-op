// Main.js
import React from 'react'
import { Button, StyleSheet, Platform, Image, Text, View } from 'react-native'
import firebase from 'react-native-firebase'

export default class Main extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  // handleSignOut = () => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => this.props.navigation.navigate('SignUp'))
  // }

  handleSignOut = () => {
    this.props.navigation.navigate('SignUp')
  }

  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <Button key="signout" title="Sign Out" onPress={this.handleSignOut} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
