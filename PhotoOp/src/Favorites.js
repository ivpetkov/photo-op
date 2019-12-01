import * as React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import firebase from 'react-native-firebase'
import Global from './Global.js'
import { Button, ThemeProvider } from 'react-native-elements'
import { withNavigationFocus } from 'react-navigation'

class Favorites extends React.Component {
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

  async componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      await this.listenForItems(this.itemsRef);
    }
  }

  async componentDidMount(){
    await this.listenForItems(this.itemsRef);
  }

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
      console.log("dataSource", this.state.dataSource);
      this.toArrayOfObjects();
      this.setState({
        isLoading: false,
      });
    });
  }

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
        console.log("name", this.state.dataSource[0][i].name);
        dataSourceObjectsArray.push(obj);
    }
    this.setState({
      dataSource: dataSourceObjectsArray
    });
    console.log("dataSource second time", this.state.dataSource);
  }

  async updateCurrLocInfo(name, address, photoRef, dbKey) {
    var newLocInfo = [name, address, photoRef, dbKey];
    this.setState({
      currLocInfo: newLocInfo,
    });
    this.props.navigation.navigate('FavoritesDetails');
  }

  render() {
    if(this.state.isLoading == true || this.props.isFocused == false){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#ffffff"/>
        </View>
      )
    }

    Global.component = this;

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
})

export default withNavigationFocus(Favorites);
