import 'react-native-gesture-handler';
import React,  {Component} from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Preferences from './src/preferences';
import Home from './src/home';
import RestaurantList from './src/restaurantList';

const Stack = createStackNavigator();

const LightTheme = {
  dark: false,
  colors: {
    primary: '',
    background: '#F2E9E0',
    card: '',
    text: '#6B222D',
    border: '',
    notficiation: ''
  }
}

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isDarkmode: true
    };
    var mode = (this.getIsDarkmode() ? styles.darkmode : styles.lightmode);
    console.log(mode);

  }

  toggleDarkmode() {
    this.setState({ isDarkmode: !this.state.isDarkmode});
  }

  getIsDarkmode() {
    return this.state.isDarkmode;
  }

  render() {
    return (
      <NavigationContainer theme={LightTheme}>{
        <Stack.Navigator initialRouteName="Home" options={{isDarkmode: this.getIsDarkmode()}} screenOptions={{headerStyle: {backgroundColor: '#E2D6C8', borderBottomWidth: 0}, headerTintColor: '#442C1E', headerTitleStyle: {textAlign: 'center', marginLeft: -30}}}>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}} initialParams={{ isDarkmode: this.getIsDarkmode(), toggleDarkmode: this.toggleDarkmode.bind(this), getIsDarkmode: this.getIsDarkmode.bind(this) }}/>
          <Stack.Screen name="Preferences" component={Preferences} options={{title: 'Preferences'}} initialParams={{ isDarkmode: this.getIsDarkmode(), toggleDarkmode: this.toggleDarkmode.bind(this), getIsDarkmode: this.getIsDarkmode.bind(this) }}/>
          <Stack.Screen name="RestaurantList" component={RestaurantList} options={{title: 'RestaurantList'}} initialParams={{ isDarkmode: this.getIsDarkmode(), toggleDarkmode: this.toggleDarkmode.bind(this), getIsDarkmode: this.getIsDarkmode.bind(this) }}/>
        </Stack.Navigator>
      }</NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
