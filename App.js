import 'react-native-gesture-handler';
import React, {Component} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import generateRestaurantScreen from './screens/generateRestaurant';
import listScreen from './screens/list';
import prefScreen from './screens/preferences';

import styles from './styles/generateRestaurantStylesLight';

const appCream = "#E2D6C8"; // LIGHT and DARK mode: top margin bg

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="generate"
                       screenOptions={{ headerStyle: {backgroundColor: appCream} }}
      >
        <Stack.Screen name="generate"
                      component={generateRestaurantScreen}
                      options={{ 
                        title: "Generate Restaurant Recommendation",
                        headerTitleStyle: styles.titleFont
                      }}
        ></Stack.Screen>
        <Stack.Screen name="list"
                      component={listScreen}
                      options={{ 
                        title: "View / Edit Restaurant List",
                        headerTitleStyle: styles.titleFont
                      }}
        ></Stack.Screen>
        <Stack.Screen name="preferences"
                      component={prefScreen}
                      options={{ 
                        title: "View / Edit Preferences",
                        headerTitleStyle: styles.titleFont
                      }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

