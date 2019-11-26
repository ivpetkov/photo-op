import * as React from 'react';
import { Button, View, Text, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';

export default class Nat extends React.Component {
  static navigationOptions = {
    title: 'Natural Bridges',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <ScrollView>
          <Text style={{paddingBottom: 10}}>Name of recommended photo location: Natural Bridges</Text>
          <Text style={{paddingBottom: 10}}>Photo of recommended photo location</Text>
          <Image
            style={{width: 300, height: 200}}
            source={require('./images/natural_bridges.png')}
          />
          <Text style={{paddingBottom: 10}}>Description of recommended photo location</Text>
          <Text style={{paddingBottom: 10}}>Address of recommended photo location</Text>
        </ScrollView>
      </View>
    );
  }
}
