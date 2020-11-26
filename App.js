import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import generateRestaurant from './screens/generateRestaurant';
import edit from './screens/edit';
import group from './screens/group';
import recipe from './screens/recipe';
import budget from './screens/budget';

import styles from './styles/generateRestaurantStyles';

const appCream = "#E2D6C8"; // LIGHT and DARK mode: top margin bg

// screens to be rendered
function generateScreen() {
  return (
    generateRestaurant()
  );
}

function editScreen() {
  return (
    edit()
  );
}

function groupScreen() {
  return (
    group()
  );
}

function recipeScreen() {
  return (
    recipe()
  );
}

function budgetScreen() {
  return (
    budget()
  );
}

// changed font size and position of header text
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="generateScreen"
                       screenOptions={{ headerStyle: {backgroundColor: appCream} }}
      >
        <Stack.Screen name="generate"
                      component={generateScreen}
                      options={{ 
                        title: "Generate Restaurant Recommendation",
                        headerTitleStyle: styles.titleFont
                      }}
        ></Stack.Screen>
        <Stack.Screen name="edit"
                      component={editScreen}
                      options={{ 
                        title: "Edit Information",
                        headerTitleStyle: styles.titleFont
                      }}
        ></Stack.Screen>
        <Stack.Screen name="group"
                      component={groupScreen}
                      options={{ 
                        title: "Join Group",
                        headerTitleStyle: styles.titleFont
                      }}
        ></Stack.Screen>
        <Stack.Screen name="recipe"
                      component={recipeScreen}
                      options={{ 
                        title: "Find Recipes",
                        headerTitleStyle: styles.titleFont
                      }}
        ></Stack.Screen>
        <Stack.Screen name="budget"
                      component={budgetScreen}
                      options={{ 
                        title: "Budgeting Log",
                        headerTitleStyle: styles.titleFont
                      }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

