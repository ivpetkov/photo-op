import * as React from 'react';
import { Button, View, Text, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { getDistance, convertDistance } from 'geolib';
//import LocationButtons from './src/LocationButtons.js'

class HomeScreen extends React.Component {
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
    await this.getCoords();
    await this.getPhotoCoords();

    for(var i = 0; i < this.state.photoDists.length; i++){
      calculated_dist = getDistance(
        {latitude: this.state.latitude, longitude: this.state.longitude },
        {latitude: this.state.photoDists[i][1], longitude: this.state.photoDists[i][2]}
      );
      calculated_dist = convertDistance(calculated_dist, 'mi');
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

  getCoords(){
    var address = '400+Beach+St,';
    var apiCall = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'Santa+Cruz,+CA&key=AIzaSyBv__05nyUa8JC7A1WRZ4KCDJnfYP5Bt5o';
    return fetch(apiCall)
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
        <View style={{flex: 1, padding: 50}}>
          <ActivityIndicator/>
        </View>
      )
    }

    const photoButtons = this.state.distVals.map(b => {
      return <Button key={b.key} title={b.text} onPress={() => this.props.navigation.navigate(b.name)} />;
    });

    return(
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ padding: 20}}>Current Location: Santa Cruz, CA </Text>
        {photoButtons}
      </View>
    );
  }
}

class NaturalBridges extends React.Component {
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
            source={require('./src/images/natural_bridges.png')}
          />
          <Text style={{paddingBottom: 10}}>Description of recommended photo location</Text>
          <Text style={{paddingBottom: 10}}>Address of recommended photo location</Text>
        </ScrollView>
      </View>
    );
  }
}

class PorterSquiggle extends React.Component {
  static navigationOptions = {
    title: 'Porter Squiggle',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <ScrollView>
          <Text>Name of recommended photo location: Porter Squiggle</Text>
          <Text>Photo of recommended photo location</Text>
          <Image
            style={{width: 300, height: 200}}
            source={require('./src/images/squiggle.jpg')}
          />
          <Text>Description of recommended photo location</Text>
          <Text>Address of recommended photo location</Text>
        </ScrollView>
      </View>
    );
  }
}

class BoardwalkMural extends React.Component {
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
            source={require('./src/images/mural.jpg')}
          />
          <Text>Description of recommended photo location</Text>
          <Text>Address of recommended photo location</Text>
        </ScrollView>
      </View>
    );
  }
}

class Seabright extends React.Component {
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
            source={require('./src/images/seabright.jpg')}
          />
          <Text>Description of recommended photo location</Text>
          <Text>Address of recommended photo location</Text>
        </ScrollView>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Por: PorterSquiggle,
    Boa: BoardwalkMural,
    Sea: Seabright,
    Nat: NaturalBridges,
  },
  {
    initialRouteName: 'Home',

    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f765b1',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 16,
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
