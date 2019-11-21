import * as React from 'react';
import { Button, View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>Current Location: Santa Cruz, CA </Text>
        <Button
          title="Location 1"
          onPress={() => this.props.navigation.navigate('Details1')}
        />
        <Button
          title="Location 2"
          onPress={() => this.props.navigation.navigate('Details2')}
        />
        <Button
          title="Location 3"
          onPress={() => this.props.navigation.navigate('Details3')}
        />
        <Button
          title="Location 4"
          onPress={() => this.props.navigation.navigate('Details4')}
        />
        <Button
          title="Location 5"
          onPress={() => this.props.navigation.navigate('Details5')}
        />
        <Button
          title="Location 6"
          onPress={() => this.props.navigation.navigate('Details6')}
        />
        <Button
          title="Location 7"
          onPress={() => this.props.navigation.navigate('Details7')}
        />
    </View>
    );
  }

}

class DetailsScreen1 extends React.Component {
  static navigationOptions = {
    title: 'Location 1 Details',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <ScrollView>
          <Text>Name of recommended photo location: Natural Bridges</Text>
          <Text>Photo of recommended photo location</Text>
          <Image
            style={{width: 300, height: 200}}
            source={require('./images/natural_bridges.png')}
          />
          <Text>Description of recommended photo location</Text>
          <Text>Address of recommended photo location</Text>
        </ScrollView>
      </View>
    );
  }
}

class DetailsScreen2 extends React.Component {
  static navigationOptions = {
    title: 'Location 2 Details',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <ScrollView>
          <Text>Name of recommended photo location: Porter Squiggle</Text>
          <Text>Photo of recommended photo location</Text>
          <Image
            style={{width: 300, height: 200}}
            source={require('./images/squiggle.jpg')}
          />
          <Text>Description of recommended photo location</Text>
          <Text>Address of recommended photo location</Text>
        </ScrollView>
      </View>
    );
  }
}

class DetailsScreen3 extends React.Component {
  static navigationOptions = {
    title: 'Location 3 Details',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <ScrollView>
          <Text>Name of recommended photo location: Downtown Mural</Text>
          <Text>Photo of recommended photo location</Text>
          <Image
            style={{width: 300, height: 200}}
            source={require('./images/mural.jpg')}
          />
          <Text>Description of recommended photo location</Text>
          <Text>Address of recommended photo location</Text>
        </ScrollView>
      </View>
    );
  }
}

class DetailsScreen4 extends React.Component {
  static navigationOptions = {
    title: 'Location 4 Details',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <ScrollView>
          <Text>Name of recommended photo location: UCSC Arboretum</Text>
          <Text>Photo of recommended photo location</Text>
          <Image
            style={{width: 300, height: 200}}
            source={require('./images/arboretum.jpg')}
          />
          <Text>Description of recommended photo location</Text>
          <Text>Address of recommended photo location</Text>
        </ScrollView>
      </View>
    );
  }
}

class DetailsScreen5 extends React.Component {
  static navigationOptions = {
    title: 'Location 5 Details',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <ScrollView>
          <Text>Name of recommended photo location: Seabright State Beach</Text>
          <Text>Photo of recommended photo location</Text>
          <Image
            style={{width: 300, height: 200}}
            source={require('./images/seabright.jpg')}
          />
          <Text>Description of recommended photo location</Text>
          <Text>Address of recommended photo location</Text>
        </ScrollView>
      </View>
    );
  }
}

class DetailsScreen6 extends React.Component {
  static navigationOptions = {
    title: 'Location 6 Details',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <ScrollView>
          <Text>Name of recommended photo location: West Cliff</Text>
          <Text>Photo of recommended photo location</Text>
          <Image
            style={{width: 300, height: 200}}
            source={require('./images/west_cliff.jpg')}
          />
          <Text>Description of recommended photo location</Text>
          <Text>Address of recommended photo location</Text>
        </ScrollView>
      </View>
    );
  }
}

class DetailsScreen7 extends React.Component {
  static navigationOptions = {
    title: 'Location 7 Details',
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center'}}>
        <ScrollView>
          <Text>Name of recommended photo location: Wilder Ranch State Park</Text>
          <Text>Photo of recommended photo location</Text>
          <Image
            style={{width: 300, height: 200}}
            source={require('./images/wilder.jpg')}
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
    Details1: DetailsScreen1,
    Details2: DetailsScreen2,
    Details3: DetailsScreen3,
    Details4: DetailsScreen4,
    Details5: DetailsScreen5,
    Details6: DetailsScreen6,
    Details7: DetailsScreen7,
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
