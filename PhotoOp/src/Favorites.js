/*
  Contains list of users favorite locations
*/

import * as React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import firebase from 'react-native-firebase'
import Global from './Global.js'
import { Button, ThemeProvider } from 'react-native-elements'
import { withNavigationFocus } from 'react-navigation'

class Favorites extends React.Component {
  // Background color and text color of navigation header
  static navigationOptions = {
    title: 'Favorites',
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
      isLoading: true,
      dataSource: [],
      currLocInfo: [],
    }
    var uid = firebase.auth().currentUser.uid;
    this.itemsRef = firebase.database().ref('/users/'+uid+'/FavoritesList/');
  }

  // Only update the component when the screen is focused on
  async componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      await this.listenForItems(this.itemsRef);
    }
  }

  // When component is mounted, call the listenForItems function
  async componentDidMount(){
    await this.listenForItems(this.itemsRef);
  }

  // Retrieve user's favorite locations from database
  async listenForItems(itemsRef) {
    this.setState({
      isLoading: true
    });
    await itemsRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          address: child.val().address,
          photoRef: child.val().photoRef,
          _key: child.key
        });
      });
      let dataSourceHistory = [...this.state.dataSource];
      dataSourceHistory.push(items)
      this.setState({
        dataSource: dataSourceHistory,
      });
      this.toArrayOfObjects();
      this.setState({
        isLoading: false,
      });
    });
  }

  // Converts the array of locations into an array of objects so they can be displayed on the interface
  async toArrayOfObjects(){
    var dataSourceObjectsArray = [];
    for(var i = 0; i < this.state.dataSource[0].length; i++) {
        var obj = {
          key: i+1,
          locName: this.state.dataSource[0][i].name,
          locAddress: this.state.dataSource[0][i].address,
          locPhotoRef: this.state.dataSource[0][i].photoRef,
          dbKey: this.state.dataSource[0][i]._key,
        }
        dataSourceObjectsArray.push(obj);
    }
    this.setState({
      dataSource: dataSourceObjectsArray
    });
  }

  /*
    Update the stored name, address, and photo reference of the location the user clicks on, navigates
    to the LocationDetails screen, and passes the state to LocationDetails
  */
  async updateCurrLocInfo(name, address, photoRef, dbKey) {
    var newLocInfo = [name, address, photoRef, dbKey];
    this.setState({
      currLocInfo: newLocInfo,
    });
    this.props.navigation.navigate('FavoritesDetails');
  }

  // When the component renders, return the Favorites screen
  render() {
    if(this.state.isLoading == true || this.props.isFocused == false){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#ffffff"/>
        </View>
      )
    }

    // Stores the current state of this component and passes it to the Global module
    Global.component = this;

    // Maps the photo locations to buttons
    const photoButtons = this.state.dataSource.map(b => {
      return <Button key={b.key} title={b.locName} onPress={() => this.updateCurrLocInfo(b.locName, b.locAddress, b.locPhotoRef, b.dbKey)} />;
    });

    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <ScrollView>
            {photoButtons}
          </ScrollView>
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
})

// Determine if screen is focused on
export default withNavigationFocus(Favorites);
