/*
  Home screen component that contains list of photo locations
*/

import * as React from 'react'
import { View, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator, Picker } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { getDistance, convertDistance } from 'geolib'
import firebase from 'react-native-firebase'
import Global from './Global.js'
import { Button, Text, ThemeProvider } from 'react-native-elements'

export default class Home extends React.Component {
  // Background color and text color of navigation header
  static navigationOptions = {
    title: 'Home',
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
      latitude: 0,
      longitude: 0,
      dist: 0,
      photoDists: [],
      distVals:[],
      isLoading: true,
      locText: '1156 High St',
      currLocInfo: [],
      filter: 'all',
      filteredDistVals: [],
    }
    this.calculateDistance = this.calculateDistance.bind(this);
  }

  // Function that handles signOut and redirect to Loading screen
  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Loading'))
  }

  // When the component mounts, call the calculateDistance function
  async componentDidMount(){
    await this.calculateDistance();
  }

  /*
    Get the location name, longitude, latitude, address, photo reference,
    and type of each recommended location using the Google Maps Plaecs API call
  */
  async getPhotoCoords(){
    var photoLocations = [
      ['Natural%20Bridges%20State%20Beach%20Santa%20Cruz', 'beach'],
      ['Porter%20Squiggle%20Santa%20Cruz', 'hidden'],
      ['Walton%20Lighthouse%20Santa%20Cruz', 'beach'],
      ["Mitchell's%20Cove%20Beach%20Santa%20Cruz", 'beach'],
      ['Wilder%20Ranch%20State%20Park%20Santa%20Cruz', 'beach'],
      ['Jogging%20Track%20Santa%20Cruz', 'vista'],
      ['Cliff%20Drive%20Vista%20Point%20Santa%20Cruz', 'vista'],
      ['Neary%20Lagoon%20Park%20Santa%20Cruz', ''],
      ['Santa%20Cruz%20Wharf%20Santa%20Cruz', 'vista'],
      ['Mission%20Santa%20Cruz%20Santa%20Cruz', ''],
      ['Westlake%20Park%20Santa%20Cruz', ''],
      ['Antonelli%20Pond%20Santa%20Cruz', ''],
      ['Sergeant%20Derby%20Park%20Santa%20Cruz', ''],
      ['Harvey%20West%20Park%20Santa%20Cruz', ''],
      ['Evergreen%20Cemetary%20Santa%20Cruz', ''],
      ['Pogonip%20Historic%20Lime%20Kiln%20Santa%20Cruz', 'hidden'],
      ['Koi%20Pond%20SantaCruz%20Santa%20Cruz', 'hidden'],
      ['Pipeline%20Trail%20Overlook%20Santa%20Cruz', 'vista'],
      ['Garden%20of%20Eden%20Santa%20Cruz', 'hidden'],
      ['Empire%20Cave%20Santa%20Cruz', 'hidden'],
      ['Crown%20Meadow%20Santa%20Cruz', ''],
      ['The%20Painted%20Barrels%20Santa%20Cruz', 'hidden'],
    ];

    var id = '';
    for(var i=0; i < photoLocations.length; i++) {
      id = photoLocations[i][0];
      await fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+id+'&inputtype=textquery&fields=photos,formatted_address,name,geometry&key=AIzaSyBv__05nyUa8JC7A1WRZ4KCDJnfYP5Bt5o')
      .then((response) => response.json())
      .then((responseJson) => {
        var locationName = responseJson.candidates[0].name;
        var latitude = responseJson.candidates[0].geometry.location.lat;
        var longitude = responseJson.candidates[0].geometry.location.lng;
        var address = responseJson.candidates[0].formatted_address;
        var photoRef = responseJson.candidates[0].photos[0].photo_reference;
        var type = photoLocations[i][1];

        let photoDistsHistory = [...this.state.photoDists];
        photoDistsHistory.push([locationName, latitude, longitude, address, photoRef, type])
        this.setState({
          photoDists: photoDistsHistory
        });
      })
      .catch((error) =>{
        console.error(error);
      });
    }
  }

  // Calculate the distance between inputted location and all photo locations
  async calculateDistance(){
    this.setState({
      isLoading: true
    });
    await this.getCoords();
    await this.getPhotoCoords();

    // Call geolib module to getDistance and convert it to miles for each location
    for(var i = 0; i < this.state.photoDists.length; i++){
      calculated_dist = await getDistance(
        {latitude: this.state.latitude, longitude: this.state.longitude },
        {latitude: this.state.photoDists[i][1], longitude: this.state.photoDists[i][2]}
      );
      calculated_dist = await convertDistance(calculated_dist, 'mi');
      let distValsHistory = [...this.state.distVals];
      distValsHistory.push([this.state.photoDists[i][0], calculated_dist, this.state.photoDists[i][3], this.state.photoDists[i][4], this.state.photoDists[i][5]])
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

  // Calculates new distances when user inputs a new address
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
      distValsHistory.push([this.state.photoDists[i][0], calculated_dist, this.state.photoDists[i][3],  this.state.photoDists[i][4], this.state.photoDists[i][5]])
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

  // Parses the user's inputted address
  parseAddress(address) {
    return address.split(' ').join('+');
  }

  // Gets the latitude and the longitude of the user's inputted address by calling the Google Maps geocoding API
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

  // Helper function for sortLocations
  comparator(a,b){
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  }

  // Sorts the recommended locations based on their calculated distances from closest to furthest
  sortLocations(){
    myArray = this.state.distVals.sort(this.comparator);
    this.setState({
      distVals: myArray
    });
  }

  // Converts the array of locations into an array of objects so they can be displayed on the interface
  toArrayOfObjects(){
    var distValsObjectsArray = [];
    for(var i = 0; i < this.state.distVals.length; i++) {
        var obj = {
          key: i+1,
          buttonText: this.state.distVals[i][0] + " " + this.state.distVals[i][1].toFixed(1) + " mi",
          locName: this.state.distVals[i][0],
          locAddress: this.state.distVals[i][2],
          locPhotoRef: this.state.distVals[i][3],
          locType: this.state.distVals[i][4],
        }
        distValsObjectsArray.push(obj);
    }
    this.setState({
      distVals: distValsObjectsArray
    });
  }

  /*
    Update the stored name, address, and photo reference of the location the user clicks on, navigates
    to the LocationDetails screen, and passes the state to LocationDetails
  */
  updateCurrLocInfo(name, address, photoRef) {
    var newLocInfo = [name, address, photoRef];
    this.setState({
      currLocInfo: newLocInfo
    });
    this.props.navigation.navigate('LocationDetails');
  }

  // Filters the recommended locations based on the user's specified type
  async filterLocByType(itemValue){
    this.setState({
      isLoading: true,
      filter: itemValue,
    });
    // If the user picks 'all', display all recommended locations
    if(itemValue === 'all') {
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
        distValsHistory.push([this.state.photoDists[i][0], calculated_dist, this.state.photoDists[i][3], this.state.photoDists[i][4], this.state.photoDists[i][5]])
        this.setState({
          distVals: distValsHistory
        });
      }
      await this.sortLocations();
      await this.toArrayOfObjects();
    }
    // If the user picks any other value, only display the locations that match that type
    if(itemValue === 'beach' || itemValue === 'vista' || itemValue === 'hidden') {
      this.setState({
        distVals: []
      });
      for(var i = 0; i < this.state.photoDists.length; i++){
        if(this.state.photoDists[i][5] === itemValue) {
          calculated_dist = await getDistance(
            {latitude: this.state.latitude, longitude: this.state.longitude },
            {latitude: this.state.photoDists[i][1], longitude: this.state.photoDists[i][2]}
          );
          calculated_dist = await convertDistance(calculated_dist, 'mi');
          let distValsHistory = [...this.state.distVals];
          distValsHistory.push([this.state.photoDists[i][0], calculated_dist, this.state.photoDists[i][3], this.state.photoDists[i][4], this.state.photoDists[i][5]])
          this.setState({
            distVals: distValsHistory
          });
        }
      }
      await this.sortLocations();
      await this.toArrayOfObjects();
    }
    this.setState({
      isLoading: false
    });
  }

  // When the component renders, return the home screen
  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#ffffff"/>
        </View>
      )
    }

    // Stores the current state of this component and passes it to the Global module
    Global.component = this;

    // Maps the photo locations to buttons
    const photoButtons = this.state.distVals.map(b => {
      return <Button key={b.key} title={b.buttonText} onPress={() => this.updateCurrLocInfo(b.locName, b.locAddress, b.locPhotoRef)} />;
    });

    return(
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <View style={{flex: 1}}>
            {/* Input box for user's desired location */}
            <TextInput
              style={styles.textInput}
              placeholder="Enter address"
              onChangeText={(text) => this.setState({locText: text})}
              onSubmitEditing={a => {
                this.calculateNewDistance()
              }}
              value={this.state.locText}
            />
          </View>
          <View style={{flex: 7}}>
            {/* Scrollable view of all recommended locations */}
            <ScrollView>
              {photoButtons}
            </ScrollView>
          </View>
          <View style={{flex: 3}}>
            {/* Picker for type of location */}
            <Picker
              selectedValue={this.state.filter}
              style={{height: 50, width: 150}}
              itemStyle={{color: '#ffffff'}}
              onValueChange={(itemValue, itemIndex) =>
                this.filterLocByType(itemValue)
              }>
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Beach" value="beach" />
              <Picker.Item label="Vista Point" value="vista" />
              <Picker.Item label="Hidden Gem" value="hidden" />
            </Picker>
          </View>
          {/* Contains buttons that navigate to Favorites screen and signs user out */}
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button key="favorites" title="Favorites" onPress={() => this.props.navigation.navigate('Favorites')} />
            <Button key="signout" title="Sign Out" onPress={this.handleSignOut} />
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
    fontSize: 20,
    color: '#ffffff',
    marginTop: 20
  },
  textInput: {
    height: 40,
    width: 150,
    color: 'white',
    borderColor: 'white',
    borderWidth: 2,
    marginTop: 10,
  },
})
