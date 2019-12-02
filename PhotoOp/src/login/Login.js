/*
  Login screen component that handles login
*/

import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import firebase from 'react-native-firebase'
import { Button, Input, Text, ThemeProvider } from 'react-native-elements'

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  // Background color and text color of navigation header
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#f067ae',
    },
    headerTintColor: '#fff',
  };

  // Function that handles login using Firebase Authentication
  handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  // When the component renders, return the login screen
  render() {
    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <Image
            style={{height: 150, width: 120}}
            source={require('./logo.png')}
          />
          <Text style={styles.text}>Login</Text>
          {/* If firebase returns an error message, display it here*/}
          {this.state.errorMessage &&
            <Text style={{ color: 'white', paddingHorizontal: 40 }}>
              {this.state.errorMessage}
            </Text>}
          {/* Input text for email */}
          <Input
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          {/* Input text for password */}
          <Input
            secureTextEntry
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          {/* Login button that calls handleLogin function and navigates to home screen upon valid login */}
          <Button title="Login" onPress={this.handleLogin} />
          <Text style={styles.text}>Need an account?</Text>
          {/* Sign Up button navigates to SignUp screen */}
          <Button
            title="Sign Up"
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </ThemeProvider>
      </View>
    )
  }
}

// Theme for React Native elements components
const theme = {
  Button: {
    raised: false,
    containerStyle: {
      marginTop: 10,
      marginBottom: 10,
      width: 100,
    },
    buttonStyle: {
      backgroundColor: '#de97bc'
    }
  },
  Input: {
    containerStyle: {
      marginTop: 10,
      marginBottom: 10,
      paddingHorizontal: 40
    },
    inputStyle: {
      color: '#ffffff',
    },
    inputContainerStyle: {
      borderColor: '#ffffff',
    },
  },
}

// Styling for default React Native components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f067ae',
  },
  text: {
    fontSize: 20,
    color: '#ffffff',
    marginTop: 20
  },
})
