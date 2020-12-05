import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React,  {Component, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as Permissions from 'expo-permissions';

import './src/HomePage';
import generateRestaurantScreen from './src/GenerateRestaurant';
import GroupAccommodationsPage from './src/GroupAccommodationsPage';
import HomePage from './src/HomePage';
import InvitePage from './src/InvitePage';
import Preferences from './src/preferences';
import RestaurantList from './src/restaurantList';
import RestaurantInfo from './src/RestaurantInfo';
import EditPreferences from './src/EditPreferences';
import Navbar from './src/Navbar';

import styles from './style/styles';
import { render } from 'react-dom';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const headerTintColor = '#E2D6C8';

const navigationOptions = {
  headerTitleStyle: styles.headerText,
  headerRight: () =>(<View/>),
  headerStyle: styles.header,
  ...TransitionPresets.SlideFromRightIOS
}

const groupCodeLength = 4;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDarkmode: true,
      groupCode: this.roomCodeGenerator(groupCodeLength)
    };
    var mode = (this.getIsDarkmode() ? styles.darkmode : styles.lightmode);
    console.log(mode);
  }

  roomCodeGenerator = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
    if ( !e || e.length != groupCodeLength ) {
      return false;
    }

    this.setState( prevState => ({
      groupCode: e
    }));
    console.log(e);
    return true;
  }

  getStackScreens = () => {
    return (
      <Stack.Navigator initialRouteName="Home" screenOptions = { navigationOptions }>
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
            name="Generate"
            component={generateRestaurantScreen}
            options={{
              title: "Generate Restaurant Recommendation"
            }}
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
            name = "Edit Preferences"
            component={EditPreferences}
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
        <Stack.Screen
            name = "Restaurant Info"
            component={RestaurantInfo}
            options={{
                title: "Recommendation"
            }}
            initialParams = {{
                isDarkmode: this.getIsDarkmode()
            }}
        />
      </Stack.Navigator>
    );
  }
  render() {
    return (
      <NavigationContainer>{
        <Tab.Navigator tabBar={props => <Navbar isDarkmode={this.state.isDarkmode} { ...props}/>}>
          <Tab.Screen name="Home" component={this.getStackScreens}/>
        </Tab.Navigator>
      }</NavigationContainer>
    );
  }
}

export default App;
