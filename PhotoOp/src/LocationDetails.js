import * as React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import firebase from 'react-native-firebase'
import Global from './Global.js'
import { Button, ThemeProvider } from 'react-native-elements'

export default class LocationDetails extends React.Component {
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

  writeUserData(name, address, photoRef){
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/'+uid+'/FavoritesList/').push({
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
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#ffffff"/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <View style={styles.content, {marginLeft: 40, marginRight: 40, marginTop: 10}}>
            <Text style={styles.text}>{this.state.locName}</Text>
          </View>
          <View style={styles.content}>
            <Image
              style={{width: 405, height: 300}}
              source={{uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=405&maxheight=300&photoreference='+this.state.locPhotoRef+'&key=AIzaSyBv__05nyUa8JC7A1WRZ4KCDJnfYP5Bt5o'}}
            />
          </View>
          <View style={styles.content, {marginLeft: 80, marginRight: 80}}>
            <Text style={styles.text}>{this.state.locAddress}</Text>
          </View>
          <View style={styles.content}>
            <Button key="favorites" title="Add to Favorites" onPress={() => this.writeUserData(this.state.locName, this.state.locAddress, this.state.locPhotoRef)}/>
          </View>
        </ThemeProvider>
      </View>
    );
  }
}

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
