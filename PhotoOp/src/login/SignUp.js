// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Image } from 'react-native'
import firebase from 'react-native-firebase'
import { Button, Input, ThemeProvider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
      console.log('handleSignUp')
  }

  render() {
    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <Image
            style={{height: 150, width: 120}}
            source={require('./logo.png')}
          />
          <Text style={styles.text}>Sign Up</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'white', paddingHorizontal: 40 }}>
              {this.state.errorMessage}
            </Text>}
          <Input
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <Input
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button title="Sign Up" onPress={this.handleSignUp} />
          <Text style={styles.text}>Already have an account?</Text>
          <Button
            title="Login"
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </ThemeProvider>
      </View>
    )
  }
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d43d8b',
  },
  text: {
    fontSize: 20,
    color: '#ffffff',
    marginTop: 20
  },
})
