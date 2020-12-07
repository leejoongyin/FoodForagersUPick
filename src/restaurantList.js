//import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
//import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../style/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Jason: for storeData func

export default class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantListArray: [],
      userInput: '',
    };
  }

  handleText = (text) =>{
    this.setState({userInput: text})
    /*alert(this.state.userInput)*/
  }

  // Jason
  // for byPref modifying
  storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key,jsonValue)
    } catch (e) {
      // saving error
      alert('error: ', e);
    }
  }

  addItem = () => {
    if(this.state.userInput != '') {
      const joined = this.state.restaurantListArray.concat(this.state.userInput);
      this.setState({restaurantListArray: joined });
      this.setState({userInput: ''});
    }
  }

  getRestaurantList() {
    var list = this.state.restaurantListArray;
    return list.join('\n');
  }

  pressHandler = (item) => {
    const filter = this.state.restaurantListArray.filter(index => index != item)
    this.setState({restaurantListArray: filter});
  }

  submit = () => {
    this.storeData('byPref', false); // Jason byPref
    this.props.navigation.navigate('Group Accommodations');
  }
  // TODO: Replace hardcoded colors with light mode/dark mode
  render() {

    var isDarkmode = this.props.route.params.isDarkmode;
    var mode = (isDarkmode ? styles.darkmode: styles.lightmode );

    return (
      <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 'auto', width: '100%'}, mode]}>
        <View style={{width: '80%'}}>
          <Text style={[{padding: 10, fontSize: 20, color: '#6b222d', textAlign: 'center'}, mode]}>
            {"Enter the restaurants you are deciding between:"}
          </Text>
        </View>
        <TextInput value={this.state.userInput}
          /*defaultValue = {this.state.restaurantListArray}*/
          style={{height: 40, paddingLeft: 10, width: '80%', backgroundColor: 'white', borderRadius: 5}}
          placeholder="Type restaurants here and hit enter to add to list"
          onChangeText={this.handleText}
          onSubmitEditing={this.addItem}
        />
        <View style={[{width: '80%', height: '50%'}, mode]}>
          <ScrollView style={{ marginTop: 10, marginBottom: 10,  backgroundColor: 'white', borderRadius: 5}}>
            {this.state.restaurantListArray.map((item) => {
              return(
                /*<TouchableOpacity onPress={() => this.pressHandler(item)}>*/
                  <View style={styles.viewItem}>
                    <Text style={styles.textItem}>{item}</Text>
                    <View style = {{flexDirection: 'row-reverse'}}>
                      <View style={{paddingRight: 5}}/>
                      <TouchableOpacity onPress={() => this.pressHandler(item)}>
                        <MaterialIcons name='delete' size={28} color='#6b222d'/>
                      </TouchableOpacity>
                    </View>
                  </View>
                /*</TouchableOpacity>*/
              )
            })}
          </ScrollView>
        </View>
        <TouchableOpacity style={[{backgroundColor: '#6b222d', width: '80%', borderRadius: 5, marginBottom: 100}, (isDarkmode?styles.buttonColor1Dark:styles.buttonColor1)]} onPress={this.submit}>
          <View style = {{borderRadius: 10, marginTop: 10, marginBottom: 10 }}>
            <Text style={[{ fontSize: 20, textAlign: 'center', color: '#ffffff'},(isDarkmode?styles.buttonColor1Dark:styles.buttonColor1)]}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  lightmode: {
    backgroundColor: colors.liteBG,
    color: colors.accentPrim,
    borderColor: '#555555'
  },
  darkmode: {
    backgroundColor: colors.darkBG,
    color: 'white',
    borderColor: '#cccccc'
  },
  buttonColor1: {
    backgroundColor: colors.accentPrim,
    color: 'white',
  },
  buttonColor1Dark: {
    backgroundColor: colors.accentPrimDark,
    color: colors.accentPrim,
  },

  textItem: {
    color: '#6b222d',
    padding: 10,
    fontSize: 22,
  },

  viewItem:{
    //backgroundColor:'#E2D6C8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

});
