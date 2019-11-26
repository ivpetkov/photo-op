import * as React from 'react';
import { Button, View, Text, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';

export default class Boa extends React.Component {
  static navigationOptions = {
    title: 'Boardwalk Mural',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <ScrollView>
          <Text>Name of recommended photo location: Downtown Mural</Text>
          <Text>Photo of recommended photo location</Text>
          <Image
            style={{width: 300, height: 200}}
            source={require('./images/mural.jpg')}
          />
          <Text>Description of recommended photo location</Text>
          <Text>Address of recommended photo location</Text>
        </ScrollView>
      </View>
    );
  }
}
