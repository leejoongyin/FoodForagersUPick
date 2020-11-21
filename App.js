import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React,  {Component, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import './HomePage';
import HomePage from './HomePage';
import NextPage from './NextPage';
import Navbar from './Navbar';
import styles from './styles';
import { render } from 'react-dom';

const Stack = createStackNavigator();

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
        <Stack.Navigator initialRouteName="Home" options = {{isDarkmode: this.getIsDarkmode() }}>
          <Stack.Screen name="Home" component={HomePage} options={{headerShown: false}} initialParams={{ isDarkmode: this.getIsDarkmode(), toggleDarkmode: this.toggleDarkmode.bind(this), getIsDarkmode: this.getIsDarkmode.bind(this) }}/> 
          <Stack.Screen name="Next Page" component={NextPage} options={{headerShown: true, headerTransparent: true, headerTintColor: (this.getIsDarkmode()?'white':'black') }} initialParams={{ mode: this.mode}} />
        </Stack.Navigator>
      }</NavigationContainer>
    );
  }
}

export default App;