import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React,  {Component, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Permissions from 'expo-permissions';

import './src/HomePage';
import GroupAccommodationsPage from './src/GroupAccommodationsPage';
import HomePage from './src/HomePage';
import InvitePage from './src/InvitePage';
import Navbar from './src/Navbar';
import NextPage from './src/NextPage';
import Preferences from './src/preferences';
import RestaurantList from './src/restaurantList'

import styles from './style/styles';
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
      isDarkmode: true,
      groupCode: "ABCD"
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

  getGroupCode() {
    return this.state.groupCode;
  }

  setGroupCode( e ) {
    if ( !e ) {
      return false;
    }

    this.setState( prevState => ({
      groupCode: e
    }));
    console.log(e);
    return true;
  }

  render() {
    return (
      <NavigationContainer>{
        <Stack.Navigator initialRouteName="Home" screenOptions = { navigationOptions}>
          <Stack.Screen
              name="Home"
              component={HomePage}
              options={{headerShown: false}}
              initialParams={{
                  isDarkmode: this.getIsDarkmode(),
                  toggleDarkmode: this.toggleDarkmode.bind(this),
                  getIsDarkmode: this.getIsDarkmode.bind(this)
              }}
          />
          <Stack.Screen
              name="Placeholder"
              component={NextPage}
              initialParams={{
                  isDarkmode: this.getIsDarkmode()
              }}
          />
          <Stack.Screen
              name="Group Accommodations"
              component={GroupAccommodationsPage}
              initialParams={{
                  isDarkmode: this.getIsDarkmode(),
                  getGroupCode: this.getGroupCode.bind(this),
                  setGroupCode: this.setGroupCode.bind(this)
              }}
          />
          <Stack.Screen
              name = "Invite Page"
              component={InvitePage}
              options={{
                  title: "Group Accommodations"
              }}
              initialParams = {{
                  isDarkmode: this.getIsDarkmode(),
                  getGroupCode: this.getGroupCode.bind(this),
                  setGroupCode: this.setGroupCode.bind(this)
              }}
          />
          <Stack.Screen
              name = "Preferences"
              component={Preferences}
              options={{
                  title: "Preferences"
              }}
              initialParams = {{
                  isDarkmode: this.getIsDarkmode()
              }}
          />
          <Stack.Screen
              name = "Restaurant List"
              component={RestaurantList}
              options={{
                  title: "Restaurant List"
              }}
              initialParams = {{
                  isDarkmode: this.getIsDarkmode()
              }}
          />
        </Stack.Navigator>
      }</NavigationContainer>
    );
  }
}

export default App;
