import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>PhotoOp</Text>
      </View>
    );
  }
}

export default Header

const styles = StyleSheet.create ({
   header: {
     height: 75,
     marginTop: 20,
     backgroundColor: '#f765b1',
   },
   text: {
      color: '#ffffff',
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 10
   }
})
