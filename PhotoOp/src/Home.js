import * as React from 'react'
import { Button, View, Text, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator, Picker } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { getDistance, convertDistance } from 'geolib'
import firebase from 'react-native-firebase'
import Global from './Global.js'

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
      currLocInfo: [],
      filter: 'all',
      filteredDistVals: [],
    }
    this.calculateDistance = this.calculateDistance.bind(this);
  }

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Loading'))
  }

  async componentDidMount(){
    await this.calculateDistance();
    console.log(firebase.auth().currentUser);
  }

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

  updateCurrLocInfo(name, address, photoRef) {
    var newLocInfo = [name, address, photoRef];
    this.setState({
      currLocInfo: newLocInfo
    });
    this.props.navigation.navigate('LocationDetails');
  }

  async filterLocByType(itemValue){
    this.setState({
      isLoading: true,
      filter: itemValue,
    });
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

  render(){
    if(this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    Global.component = this;

    const photoButtons = this.state.distVals.map(b => {
      return <Button key={b.key} title={b.buttonText} onPress={() => this.updateCurrLocInfo(b.locName, b.locAddress, b.locPhotoRef)} />;
    });

    return(
      <View style={styles.container}>
        <View style={{padding: 10}}>
        <Button key="favorites" title="Go to favorites" onPress={() => this.props.navigation.navigate('Favorites')} />
          <Button key="signout" title="Sign Out" onPress={this.handleSignOut} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter address"
            onChangeText={(text) => this.setState({locText: text})}
            onSubmitEditing={a => {
              console.log(`onSubmitEditing: ${this.state.inputText}`),
              this.calculateNewDistance()
            }}
            value={this.state.locText}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          {photoButtons}
        </ScrollView>
        <View style={{padding: 10, position: 'absolute', bottom: 200}}>
          <Picker
            selectedValue={this.state.filter}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) =>
              this.filterLocByType(itemValue)
            }>
            <Picker.Item label="All" value="all" />
            <Picker.Item label="Beach" value="beach" />
            <Picker.Item label="Vista Point" value="vista" />
            <Picker.Item label="Hidden Gem" value="hidden" />
          </Picker>
        </View>
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
  textInput: {
    height: 40,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  scrollView: {
    maxHeight: 450,
  }
})
