import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

class List extends Component {
   state = {
      names: [
         {
            id: 0,
            name: 'Place 1',
         },
         {
            id: 1,
            name: 'Place 2',
         },
         {
            id: 2,
            name: 'Place 3',
         },
         {
            id: 3,
            name: 'Place 4',
         },
         {
            id: 4,
            name: 'Place 4',
         },
         {
            id: 5,
            name: 'Place 5',
         },
         {
            id: 6,
            name: 'Place 6',
         },
         {
            id: 7,
            name: 'Place 7',
         }
      ]
   }
   alertItemName = (item) => {
      alert(item.name)
   }
   render() {
      return (
         <View>
            {
               this.state.names.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {() => this.alertItemName(item)}>
                     <Text style = {styles.text}>
                        {item.name}
                     </Text>
                  </TouchableOpacity>
               ))
            }
         </View>
      )
   }
}
export default List

const styles = StyleSheet.create ({
   container: {
      padding: 20,
      marginTop: 5,
      backgroundColor: '#f5b5d6',
      alignItems: 'center',
   },
   text: {
      color: '#4f603c'
   }
})
