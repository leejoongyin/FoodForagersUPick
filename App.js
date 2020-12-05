import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React,  {Component, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

import styles from './style/styles';
import { render } from 'react-dom';

const Stack = createStackNavigator();
const GenerateStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const headerTintColor = '#E2D6C8';

const navigationOptions = {
  headerTitleStyle: styles.headerText,
  headerRight: () =>(<View/>),
  headerStyle: styles.header
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
  }

  getIsDarkmode() {
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

  GenerateStackScreen  = () => {
    return (
      <GenerateStack.Navigator>
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
         <GenerateStack.Screen
              name="Generate"
              component={generateRestaurantScreen}
              options={{ 
                title: "Generate Restaurant Recommendation"
              }}
              initialParams={{
                isDarkmode: this.getIsDarkmode()
            }}
          />
        <GenerateStack.Screen
              name="Group Accommodations"
              component={GroupAccommodationsPage}
              initialParams={{
                  isDarkmode: this.getIsDarkmode(),
                  getGroupCode: this.getGroupCode.bind(this),
                  setGroupCode: this.setGroupCode.bind(this)
              }}
          />
          <GenerateStack.Screen
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
          <GenerateStack.Screen
              name = "Preferences"
              component={Preferences}
              options={{
                  title: "Preferences"
              }}
              initialParams = {{
                  isDarkmode: this.getIsDarkmode()
              }}
          />
          <GenerateStack.Screen
              name = "Restaurant List"
              component={RestaurantList}
              options={{
                  title: "Restaurant List"
              }}
              initialParams = {{
                  isDarkmode: this.getIsDarkmode()
              }}
          />
          <GenerateStack.Screen
              name = "Restaurant Info"
              component={RestaurantInfo}
              options={{
                  title: "Recommendation"
              }}
              initialParams = {{
                  isDarkmode: this.getIsDarkmode()
              }}
          />
      </GenerateStack.Navigator>
    );
  }

  render() {
    return(
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Edit Preferences" component={EditPreferences} options={{
                  title: "Preferences"
              }}
              initialParams = {{
                  isDarkmode: this.getIsDarkmode()
              }}/>
          <Tab.Screen name="Join Group" component={GroupAccommodationsPage} initialParams={{
              isDarkmode: this.getIsDarkmode(),
              getGroupCode: this.getGroupCode.bind(this),
              setGroupCode: this.setGroupCode.bind(this)
          }} />
          <Tab.Screen name="Generate Recommendations" component={this.GenerateStackScreen} />
          <Tab.Screen name="Recipe" component={''} />
          <Tab.Screen name="Budget" component={''} />
        </Tab.Navigator>
    </NavigationContainer>
    )
  }

  /*render() {
    return (
      <NavigationContainer>{
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
      }</NavigationContainer>
    );
  }*/
}

export default App;
