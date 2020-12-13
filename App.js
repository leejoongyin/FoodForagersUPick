import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React,  {Component, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as Permissions from 'expo-permissions';

import './src/view/HomePage';
import generateRestaurantScreen from './src/view/GenerateRestaurant';
import GroupAccommodationsPage from './src/view/GroupAccommodationsPage';
import HomePage from './src/view/HomePage';
import InvitePage from './src/view/InvitePage';
import Preferences from './src/view/preferences';
import RestaurantList from './src/view/restaurantList';
import RestaurantInfo from './src/view/RestaurantInfo';
import EditPreferences from './src/view/EditPreferences';
import BudgetLog from './src/view/BudgetLog';
import Navbar from './src/view/Navbar';
import RecipeSearch from './src/view/recipeSearch';
import RestaurantFromList from './src/view/RestaurantFromList';

import styles from './src/style/styles';
import { render } from 'react-dom';
import { GROUP_CODE_LENGTH, GROUP_CODE_VALID_CHARS } from './src/constants';

import groupController from './src/controller/groupController';
import localController from './src/controller/localController';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const headerTintColor = '#E2D6C8';

const navigationOptions = {
  headerTitleStyle: styles.headerText,
  headerRight: () =>(<View/>),
  headerStyle: styles.header,
  ...TransitionPresets.SlideFromRightIOS
}

// Ignore warnings
console.disableYellowBox = true;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDarkmode: true,
      mainCode: groupController.generateCode(GROUP_CODE_LENGTH),
      groupCode: "ABCD",
      restaurantList: []
    };
    var mode = (this.getIsDarkmode() ? styles.darkmode : styles.lightmode);
    console.log(mode);
    this.getStoredData();
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

  getStoredData () {
    localController.getData('myRestaurantList').then((result) => {
      if( result == null ) {
        result = [];
      }
      this.setState({restaurantList: result});
    });
  }
  setCode() {
    this.state.groupCode = this.state.mainCode;
    return true;
  }

  setGroupCode( e ) {
    if ( !groupController.checkCode( e ) ) {
      return false;
    }

    this.setState( prevState => ({
      groupCode: e
    }));
    //console.log(e);
    return true;
  }

  setRestaurantList( e ) {
    localController.storeData('myRestaurantList', e);
    this.setState(prevState=>({
      restaurantList: e
    }));
  }

  getRestaurantList() {
    return this.state.restaurantList;
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
                setGroupCode: this.setGroupCode.bind(this),
                setCode: this.setCode.bind(this),
                getRestaurantList: this.getRestaurantList.bind(this),

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
                setGroupCode: this.setGroupCode.bind(this),
                getRestaurantList: this.getRestaurantList.bind(this),
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
                isDarkmode: this.getIsDarkmode(),
                getRestaurantList: this.getRestaurantList.bind(this),
                setRestaurantList: this.setRestaurantList.bind(this),
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
        <Stack.Screen
            name = "Restaurant From List"
            component={RestaurantFromList}
            options={{
                title: "Recommendation"
            }}
            initialParams = {{
                isDarkmode: this.getIsDarkmode(),
                getRestaurantList: this.getRestaurantList.bind(this),
                restaurantList: this.getRestaurantList(),
            }}
        />
        <Stack.Screen
          name="Budget Log"
          component={BudgetLog}
          options={{
            title: "Budget Log"
          }}
          initialParams = {{
              isDarkmode: this.getIsDarkmode()
          }}
        />
        <Stack.Screen
          name="Search Recipe"
          component={RecipeSearch}
          options={{
            title: "Search for Recipe"
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
