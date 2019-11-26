import * as React from 'react';
import { Button, View, Text, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { getDistance, convertDistance } from 'geolib';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props){
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      dist: 0,
      photoDists: [],
      distVals:[],
      isLoading: true,
      locText: '1156 High St',
    }
    this.calculateDistance = this.calculateDistance.bind(this);
  }

  async componentDidMount(){
    await this.calculateDistance();
  }

  async getPhotoCoords(){
    await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=2531+W+Cliff+Dr,+Santa+Cruz,+CA&key=AIzaSyBv__05nyUa8JC7A1WRZ4KCDJnfYP5Bt5o')
    .then((response) => response.json())
    .then((responseJson) => {
      var location = "Natural Bridges";
      var latitude = responseJson.results[0].geometry.location.lat;
      var longitude = responseJson.results[0].geometry.location.lng;
      let photoDistsHistory = [...this.state.photoDists];
      photoDistsHistory.push([location, latitude, longitude])
      this.setState({
        photoDists: photoDistsHistory
      });
    })
    .catch((error) =>{
      console.error(error);
    });

    await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=30+Front+St,+Santa+Cruz,+CA&key=AIzaSyBv__05nyUa8JC7A1WRZ4KCDJnfYP5Bt5o')
    .then((response) => response.json())
    .then((responseJson) => {
      var location = "Boardwalk Mural";
      var latitude = responseJson.results[0].geometry.location.lat;
      var longitude = responseJson.results[0].geometry.location.lng;
      let photoDistsHistory = [...this.state.photoDists];
      photoDistsHistory.push([location, latitude, longitude])
      this.setState({
        photoDists: photoDistsHistory
      });
    })
    .catch((error) =>{
      console.error(error);
    });

    await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1200+Heller+Dr,+Santa+Cruz,+CA&key=AIzaSyBv__05nyUa8JC7A1WRZ4KCDJnfYP5Bt5o')
    .then((response) => response.json())
    .then((responseJson) => {
      var location = "Porter Squiggle";
      var latitude = responseJson.results[0].geometry.location.lat;
      var longitude = responseJson.results[0].geometry.location.lng;
      let photoDistsHistory = [...this.state.photoDists];
      photoDistsHistory.push([location, latitude, longitude])
      this.setState({
        photoDists: photoDistsHistory
      });
    })
    .catch((error) =>{
      console.error(error);
    });

    await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1104+E+Cliff+Dr,+Santa+Cruz,+CA&key=AIzaSyBv__05nyUa8JC7A1WRZ4KCDJnfYP5Bt5o')
    .then((response) => response.json())
    .then((responseJson) => {
      var location = "Seabright";
      var latitude = responseJson.results[0].geometry.location.lat;
      var longitude = responseJson.results[0].geometry.location.lng;
      let photoDistsHistory = [...this.state.photoDists];
      photoDistsHistory.push([location, latitude, longitude])
      this.setState({
        photoDists: photoDistsHistory
      });
    })
    .catch((error) =>{
      console.error(error);
    });

    //temporarily took out other locations to make file smaller

  }

  async calculateDistance(){
    this.setState({
      isLoading: true
    });
    await this.getCoords();
    await this.getPhotoCoords();

    for(var i = 0; i < this.state.photoDists.length; i++){
      calculated_dist = await getDistance(
        {latitude: this.state.latitude, longitude: this.state.longitude },
        {latitude: this.state.photoDists[i][1], longitude: this.state.photoDists[i][2]}
      );
      calculated_dist = await convertDistance(calculated_dist, 'mi');
      let distValsHistory = [...this.state.distVals];
      distValsHistory.push([this.state.photoDists[i][0], calculated_dist])
      this.setState({
        distVals: distValsHistory
      });
    }
    await this.sortLocations();
    await this.toArrayOfObjects();
    this.setState({
      isLoading: false
    });
  }

  async calculateNewDistance(){
    this.setState({
      isLoading: true
    });
    await this.getCoords();
    this.setState({
      distVals: []
    });
    for(var i = 0; i < this.state.photoDists.length; i++){
      calculated_dist = await getDistance(
        {latitude: this.state.latitude, longitude: this.state.longitude },
        {latitude: this.state.photoDists[i][1], longitude: this.state.photoDists[i][2]}
      );
      calculated_dist = await convertDistance(calculated_dist, 'mi');
      let distValsHistory = [...this.state.distVals];
      distValsHistory.push([this.state.photoDists[i][0], calculated_dist])
      this.setState({
        distVals: distValsHistory
      });
    }
    await this.sortLocations();
    await this.toArrayOfObjects();
    this.setState({
      isLoading: false
    });
  }

  parseAddress(address) {
    return address.split(' ').join('+');
  }

  async getCoords(){
    var address = this.parseAddress(this.state.locText);
    var apiCall = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+',Santa+Cruz,+CA&key=AIzaSyBv__05nyUa8JC7A1WRZ4KCDJnfYP5Bt5o';
    await fetch(apiCall)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        latitude: responseJson.results[0].geometry.location.lat,
        longitude: responseJson.results[0].geometry.location.lng
      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  comparator(a,b){
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  }

  sortLocations(){
    myArray = this.state.distVals.sort(this.comparator);
    this.setState({
      distVals: myArray
    });
  }

  toArrayOfObjects(){
    var distValsObjectsArray = [];
    for(var i = 0; i < this.state.distVals.length; i++) {
        var obj = {
          key: i+1,
          text: this.state.distVals[i][0] + " " + this.state.distVals[i][1].toFixed(1) + " mi",
          name: this.state.distVals[i][0].substring(0,3),
        }
        distValsObjectsArray.push(obj);
    }
    this.setState({
      distVals: distValsObjectsArray
    });
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{padding: 50}}>
          <ActivityIndicator/>
        </View>
      )
    }

    const photoButtons = this.state.distVals.map(b => {
      return <Button key={b.key} title={b.text} onPress={() => this.props.navigation.navigate(b.name)} />;
    });

    console.log('text input');
    console.log(this.state.inputText);
    console.log('text input on submit');
    console.log(this.state.locText);

    return(
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{padding: 10}}>
          <Text style={{ padding: 10}}>Current Location</Text>
          <TextInput
            style={{height: 40}}
            placeholder="Santa Cruz"
            onChangeText={(text) => this.setState({locText: text})}
            onSubmitEditing={a => {
              console.log(`onSubmitEditing: ${this.state.inputText}`),
              this.calculateNewDistance()
            }}
            value={this.state.locText}
          />
        </View>
        {photoButtons}
      </View>
    );
  }
}
