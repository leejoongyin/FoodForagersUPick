//import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
//import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
//import Icon from 'react-native-vector-icons/MaterialIcons';


export default class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      restaurantListArray: ["Liuli Pavilion", "Cat's Tail Tavern", "Wanmin Restaurant", "Dawn Winery", "Yansheng Teahouse"],
      userInput: '',
    };
  }


  handleText = (text) =>{
    this.setState({userInput: text})
    /*alert(this.state.userInput)*/
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      /* e.preventDefault(); */
      if(this.state.userInput != '') {
        const joined = this.state.restaurantListArray.concat(this.state.userInput);
        this.setState({restaurantListArray: joined }); 
        this.setState({userInput: ''});
      }
    }
  }
  
  getRestaurantList() {
    var list = this.state.restaurantListArray;
    return list.join('\n');
  }

  submit() {
    console.log('Submit button pressed!');
  }
  // TODO: Replace hardcoded colors with light mode/dark mode
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 'auto', paddingLeft: 10, paddingRight: 10}}>
        <Text style={{padding: 10, fontSize: 20, color: '#6b222d', textAlign: 'center'}}>
          {"Enter the restaurants you are deciding between:"}
        </Text>
        <TextInput value={this.state.userInput} 
          /*defaultValue = {this.state.restaurantListArray}*/
          onFocus={() => this.setState({isFocused: true})}
          style={{height: 40, paddingLeft: 10, width: '85%', backgroundColor: 'white', borderRadius: 5}}
          fontStyle={this.state.isFocused ? 'normal' : 'italic'}
          placeholder={this.state.isFocused ? "" : "Type restaurants here and hit enter to add to list"}   
          onChangeText={this.handleText}
          onKeyPress={this.handleKeyPress} 
          
        />
        <View style={{width: '85%', height: '50%'}}>
          <ScrollView style={{ marginTop: 10, marginBottom: 10,  backgroundColor: 'white', borderRadius: 5}}>
            <Text style={{padding: 15, fontSize: 22, color: '#6b222d'}}>
              {this.getRestaurantList()}
            </Text>
          </ScrollView>
        </View>
        <TouchableOpacity style={{backgroundColor: '#6b222d', width: '85%', borderRadius: 5}} onPress={this.submit}>
          <View style = {{borderRadius: 10, marginTop: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 20, textAlign: 'center', color: '#ffffff'}}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};
