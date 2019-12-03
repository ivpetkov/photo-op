/*
  LocationDetails screen that contains name, picture, and address of a clicked-on photo location
*/

import * as React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import firebase from 'react-native-firebase'
import Global from './Global.js'
import { Button, ThemeProvider } from 'react-native-elements'

export default class LocationDetails extends React.Component {
  // Background color and text color of navigation header
  static navigationOptions = {
    title: 'Details',
    headerStyle: {
      backgroundColor: '#f067ae',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  // Constructor that defines all initial states
  constructor(props){
    super(props);
    this.state = {
      locName: '',
      locAddress: '',
      locPhotoRef: '',
      isLoading: true,
    }
  }

  // When the component mounts, call initializeInfo function
  componentDidMount(){
    this.initializeInfo();
  }

  // Initializes the information for screen by getting values from Global module
  initializeInfo() {
    var name = Global.component.state.currLocInfo[0];
    var address = Global.component.state.currLocInfo[1];
    var photoRef = Global.component.state.currLocInfo[2];
    this.setState({
      locName: name,
      locAddress: address,
      locPhotoRef: photoRef,
      isLoading: false,
    });
  }

  /*
    When the user clicks on button to add location to FavoritesList, add the name, photo reference,
    and address to Firebase database
  */
  writeUserData(name, address, photoRef){
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/'+uid+'/FavoritesList/').push({
        name,
        photoRef,
        address
    }).then((data)=>{
        console.log('data ' , data)
    }).catch((error)=>{
        console.log('error ' , error)
    })
  }

  // When the component renders, return the LocationDetails screen
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#ffffff"/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          {/* Display name of location */}
          <View style={styles.content, {marginLeft: 40, marginRight: 40, marginTop: 10}}>
            <Text style={styles.text}>{this.state.locName}</Text>
          </View>
          {/* Display photo of location by calling Google Maps Places Photo API*/}
          <View style={styles.content}>
            <Image
              style={{width: 405, height: 300}}
              source={{uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=405&maxheight=300&photoreference='+this.state.locPhotoRef+'&key=AIzaSyBv__05nyUa8JC7A1WRZ4KCDJnfYP5Bt5o'}}
            />
          </View>
          {/* Display address of location */}
          <View style={styles.content, {marginLeft: 80, marginRight: 80}}>
            <Text style={styles.text}>{this.state.locAddress}</Text>
          </View>
          {/* Allow user to add location to FavoritesList */}
          <View style={styles.content}>
            <Button key="favorites" title="Add to Favorites" onPress={() => this.writeUserData(this.state.locName, this.state.locAddress, this.state.locPhotoRef)}/>
          </View>
        </ThemeProvider>
      </View>
    );
  }
}

// Theme for React Native elements components
const theme = {
  Button: {
    raised: false,
    containerStyle: {
      marginTop: 5,
      marginBottom: 5,
      paddingHorizontal: 10,
      maxWidth: 350
    },
    buttonStyle: {
      backgroundColor: '#de97bc'
    }
  },
}

// Styling for default React Native components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f067ae',
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f067ae',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 20
  }
})
