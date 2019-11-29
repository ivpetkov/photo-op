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
      isLoading: true,
      dataSource: [],
      currLocInfo: [],
    }
    this.itemsRef = firebase.database().ref('FavoritesList/');

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

  updateCurrLocInfo(name, address, photoRef, dbKey) {
    var newLocInfo = [name, address, photoRef, dbKey];
    this.setState({
      currLocInfo: newLocInfo
    });
    this.props.navigation.navigate('FavoritesDetails');
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{padding: 50}}>
          <ActivityIndicator/>
        </View>
      )
    }

    Global.component = this;

    const photoButtons = this.state.dataSource.map(b => {
      return <Button key={b.key} title={b.locName} onPress={() => this.updateCurrLocInfo(b.locName, b.locAddress, b.locPhotoRef, b.dbKey)} />;
    });

    return (
      <ScrollView>
        {photoButtons}
      </ScrollView>
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
