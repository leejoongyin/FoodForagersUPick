//import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
//import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
//import Icon from 'react-native-vector-icons/MaterialIcons';

const MAX_SELECT = 10;


export default class RestaruantList extends Component {

  constructor(props) {
    super(props);
  }

  getRestaurantList() {
    // Hard coded example
    var list = ["McDonald's", "Burger King", "Popeyes", "Wendy's"];
    return list.join('\n');
  }
  // TODO: Replace hardcoded colors with light mode/dark mode
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 'auto', paddingLeft: 10, paddingRight: 10}}>
        <Text style={{padding: 10, fontSize: 20, color: '#6b222d', textAlign: 'center'}}>
          {"Enter the restaurants you are deciding between:"}
        </Text>
        <TextInput
          style={{height: 40, paddingLeft: 10, width: '85%', fontStyle: 'italic', backgroundColor: 'white'}}
          placeholder="Type restaurants here and hit enter to add to list"
          onChangeText={text => this.setState({text})}
        />
        <Text style={{padding: 15, marginTop: 10, marginBottom: 10, width: '85%', height: '30%', fontSize: 22, color: '#6b222d', backgroundColor: 'white'}}>
          {this.getRestaurantList()}
        </Text>
      </View>
    );
  }
};
