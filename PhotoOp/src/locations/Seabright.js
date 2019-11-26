import * as React from 'react';
import { Button, View, Text, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';

export default class Sea extends React.Component {
  static navigationOptions = {
    title: 'Seabright',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <ScrollView>
          <Text>Name of recommended photo location: UCSC Arboretum</Text>
          <Text>Photo of recommended photo location</Text>
          <Image
            style={{width: 300, height: 200}}
            source={require('./images/seabright.jpg')}
          />
          <Text>Description of recommended photo location</Text>
          <Text>Address of recommended photo location</Text>
        </ScrollView>
      </View>
    );
  }
}
