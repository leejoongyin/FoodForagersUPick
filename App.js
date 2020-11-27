import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React,  {Component, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import './HomePage';
import HomePage from './HomePage';
import GroupAccommodationsPage from './GroupAccommodationsPage';
import NextPage from './NextPage';
import Navbar from './Navbar';
import styles from './styles';
import { render } from 'react-dom';

const Stack = createStackNavigator();

const headerTintColor = '#E2D6C8';
const navigationOptions = {
  headerTitleStyle: styles.header,
  headerRight: () =>(<View/>),
  headerStyle: styles.header
}
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isDarkmode: false 
    };
    var mode = (this.getIsDarkmode() ? styles.darkmode : styles.lightmode);
    console.log(mode);
    
  }
   
  toggleDarkmode() {
    this.setState({ isDarkmode: !this.state.isDarkmode});  
    //console.log("getIsDarkmode run: " + this.getIsDarkmode());
    //console.log("isDarkmode Toggled: " + this.state.isDarkmode);
  }

  getIsDarkmode() {
    //console.log("getIsDarkmode run: " + this.state.isDarkmode);
    return this.state.isDarkmode;
  }

  render() {
    return (
      <NavigationContainer>{
        <Stack.Navigator initialRouteName="Home" screenOptions = { navigationOptions}>
          <Stack.Screen name="Home" component={HomePage} options={{headerShown: false}} initialParams={{ isDarkmode: this.getIsDarkmode(), toggleDarkmode: this.toggleDarkmode.bind(this), getIsDarkmode: this.getIsDarkmode.bind(this) }}/> 
          <Stack.Screen name="Placeholder" component={NextPage} initialParams={{ mode: this.mode}} />
          <Stack.Screen name="Group Accommodations" component={GroupAccommodationsPage} initialParams={{ mode: this.mode, isDarkmode: this.getIsDarkmode() }} />
        </Stack.Navigator>
      }</NavigationContainer>
    );
  }
}

export default App;