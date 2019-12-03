/*
  SignUp screen component that handles sign-ups
*/

import React from 'react'
import { StyleSheet, Text, TextInput, View, Image } from 'react-native'
import firebase from 'react-native-firebase'
import { Button, Input, ThemeProvider } from 'react-native-elements'

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  // Background color and text color of navigation header
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#f067ae',
    },
    headerTintColor: '#fff',
  };

  // Function that handles sign-ups using Firebase Authentication
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
      console.log('handleSignUp')
  }

  // When the component renders, return the sign-up screen
  render() {
    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <Image
            style={{height: 150, width: 120}}
            source={require('./logo.png')}
          />
          <Text style={styles.text}>Sign Up</Text>
          {/* If firebase returns an error message, display it here*/}
          {this.state.errorMessage &&
            <Text style={{ color: 'white', paddingHorizontal: 40 }}>
              {this.state.errorMessage}
            </Text>}
          {/* Input text for email */}
          <Input
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          {/* Input text for password */}
          <Input
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          {/* SignUp button that calls handleSignUp function and navigates to home screen upon valid SignUp */}
          <Button title="Sign Up" onPress={this.handleSignUp} />
          <Text style={styles.text}>Already have an account?</Text>
          {/* Login button that navigates to Login screen */}
          <Button
            title="Login"
            onPress={() => this.props.navigation.navigate('Login')}
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
