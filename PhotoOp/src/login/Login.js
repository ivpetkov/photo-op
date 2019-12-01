// Login.js
import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import firebase from 'react-native-firebase'
import { Button, Input, Text, ThemeProvider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#f067ae',
    },
    headerTintColor: '#fff',
  };

  handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <Image
            style={{height: 150, width: 120}}
            source={require('./logo.png')}
          />
          <Text style={styles.text}>Login</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'white', paddingHorizontal: 40 }}>
              {this.state.errorMessage}
            </Text>}
          <Input
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <Input
            secureTextEntry
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Button title="Login" onPress={this.handleLogin} />
          <Text style={styles.text}>Need an account?</Text>
          <Button
            title="Sign Up"
            onPress={() => this.props.navigation.navigate('SignUp')}
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
    backgroundColor: '#f067ae',
  },
  text: {
    fontSize: 20,
    color: '#ffffff',
    marginTop: 20
  },
})
