import * as React from 'react'
import { Button, View, Text, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import firebase from 'react-native-firebase'

import Global from './Global.js';

export default class Favorites extends React.Component {
  static navigationOptions = {
    title: 'Favorites',
  };

  constructor(props){
    super(props);
    this.state = {
      locName: '',
      locAddress: '',
      locPhotoRef: '',
      isLoading: true,
    }
  }

  componentDidMount(){
    this.initializeInfo();
  }

  initializeInfo() {
    // var name = Global.component.state.currLocInfo[0];
    // var address = Global.component.state.currLocInfo[1];
    // var photoRef = Global.component.state.currLocInfo[2];
    this.setState({
      // locName: name,
      // locAddress: address,
      // locPhotoRef: photoRef,
      isLoading: false,
    });
  }

  writeUserData(name, address, photoRef){
    firebase.database().ref('FavoritesList/').push({
        name,
        photoRef,
        address
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{padding: 50}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View>
        <Text style={styles.text}>bfkbdghdfhj</Text>
        <Text style={styles.text}>bgdfjgjhgdf</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
})
