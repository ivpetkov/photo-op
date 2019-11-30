import * as React from 'react'
import { Button, View, Text, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import firebase from 'react-native-firebase'
import Global from './Global.js'

export default class FavoritesDetails extends React.Component {
  static navigationOptions = {
    title: 'Details',
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
    var dbKey = Global.component.state.currLocInfo[3];
    this.setState({
      locName: name,
      locAddress: address,
      locPhotoRef: photoRef,
      locKey: dbKey,
      isLoading: false,
    });
  }

  async deleteData(key){
    this.setState({
      isLoading: true,
    });
    var uid = firebase.auth().currentUser.uid;
    await firebase.database().ref('/users/'+uid+'/FavoritesList/').child(key).remove();
    this.props.navigation.navigate('Favorites');
    this.setState({
      isLoading: false,
    });
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
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.text}>{this.state.locName}</Text>
            <Image
              style={{width: 400, height: 300}}
              source={{uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=300&photoreference='+this.state.locPhotoRef+'&key=AIzaSyBv__05nyUa8JC7A1WRZ4KCDJnfYP5Bt5o'}}
            />
            <Text style={styles.text}>{this.state.locAddress}</Text>
            <Button key="favorites" title="Remove from favorites" onPress={() => this.deleteData(this.state.locKey)}/>
          </View>
        </ScrollView>
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
