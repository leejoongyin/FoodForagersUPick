import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../style/colors';
import validateZip from '../model/validateZip';

import { ThemeProvider } from '@react-navigation/native';

const MAX_SELECT = 10;

export default class Preferences extends Component {

  constructor(props) {
    super(props);
    this.budgetSelectionHandler = new SelectionHandler({ maxMultiSelect: MAX_SELECT, allowDeselect: true, defaultSelection: null });
    this.dietSelectionHandler = new SelectionHandler({ maxMultiSelect: MAX_SELECT, allowDeselect: true, defaultSelection: null });
    this.cuisineSelectionHandler = new SelectionHandler({ maxMultiSelect: MAX_SELECT, allowDeselect: true, defaultSelection: null });
    this.restaurantSelectionHandler = new SelectionHandler({ maxMultiSelect: MAX_SELECT, allowDeselect: true, defaultSelection: null });
    this.state = {
        zipcode: "",
        zipErrorText: "",
        selectedItems: null,
        budgetArray: [],
        dietArray: [],
        cuisineArray: [],
        restaurantArray: [],
        text : ''
    };
    this.isDarkmode = this.props.isDarkmode;
  }

  // If the user somehow inputs non-numeric characters, remove them. Also limit
  // the input to 5 numbers.
  onZipInput(text) {
    this.setState({zipcode: text.replace(/[^0-9]/g, '')}, () => {
      this.storeData('zipcode', this.state.zipcode);
    });
  }

  // Show an error text when the user inputs an invalid zipcode.
  onZipBlur() {
    const errorText = !validateZip(this.state.zipcode) ? "Please enter a valid zipcode." : "";
    this.setState({zipErrorText: errorText});
  }

  savePreferences = () => {
    this.storeData('byPref', true); // Jason
    this.props.navigation.navigate('Group Accommodations');
    
  }


  storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key,jsonValue)
    } catch (e) {
      // saving error
      alert('error: ', e);
    }
  }

  getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key).then((key) => {alert(key);})
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
      // read error
      alert('error: ', e);
    } 
    console.log('Done.')
  }

  renderButton = (data, index, isSelected, onPress) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        key={index}
        style={[styles.button,
        { backgroundColor: isSelected ? '#A6433F' : '#FFF'}]}>
        <Text style={[styles.buttonText, {color: isSelected ? '#FFF' : '#000'}]}>{data.optionText}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    var isDarkmode = this.props.route.params.isDarkmode;
    var mode = (isDarkmode ? styles.darkmode: styles.lightmode );

    const budgetData = [
      { id: 1, optionText: '$' },
      { id: 2, optionText: '$$' },
      { id: 3, optionText: '$$$' }
    ];

    const dietData = [
      { id: 4, optionText: 'Lactose intolerant' },
      { id: 5, optionText: 'Nut allergy' },
      { id: 6, optionText: 'Shellfish allergy' },
      { id: 7, optionText: 'Vegan' },
      { id: 8, optionText: 'Vegetarian' },
      { id: 9, optionText: 'Kosher' },
      { id: 10, optionText: 'Paleo' }
    ];

    const cuisineData = [
      { id: 1, optionText: 'Chinese' },
      { id: 2, optionText: 'American' },
      { id: 3, optionText: 'Mexican' },
      { id: 4, optionText: 'Italian' },
      { id: 5, optionText: 'Japanese' },
      { id: 6, optionText: 'Korean' },
      { id: 7, optionText: 'Thai' },
      { id: 7, optionText: 'Vietnamese' },
      { id: 7, optionText: 'Indian' }
    ];

    const restaurantData = [
      { id: 1, optionText: 'Breakfast' },
      { id: 2, optionText: 'Brunch' },
      { id: 3, optionText: 'Bar' },
      { id: 4, optionText: 'Fast Food' },
      { id: 5, optionText: 'Dessert' },
      { id: 6, optionText: 'Drink' },
      { id: 7, optionText: 'Coffee Shop' },
      { id: 7, optionText: 'BBQ' },
      { id: 7, optionText: 'Dinner' }
    ];

    return (
      <View style={[styles.container, mode, {flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', margin: 'auto'}]}>
        <View style={{width: '100%'}}>
          <ScrollView>
            <View style={{width: '80%', alignSelf: 'center'}}>
            <Text style={[styles.centerHeader, mode, {marginTop: 10}]}>Where would you like to eat?*</Text>
            <Text style={[styles.centerHeader, {marginTop: 0}, (isDarkmode ? {color: 'yellow'} : {color: 'brown'}), (!this.state.zipErrorText.length ? {marginBottom: 0, height: 0} : {height: 'auto'}) ]}>
              {this.state.zipErrorText}
            </Text>
            <View style={[styles.searchSection, mode]}>
              <Icon name="place" size={30} color={(isDarkmode?"white":"black")} style={{paddingRight: 10}}/>
              <TextInput
                style={styles.inputBox}
                keyboardType='numeric'
                placeholder="Enter zipcode"
                onChangeText={(zipcode) => {this.onZipInput(zipcode)}}
                value={this.state.zipcode}
                onBlur={() => {this.onZipBlur()}}
                maxLength={5}
                underlineColorAndroid="transparent"
              />
            </View>
            <Text style={[styles.centerHeader, mode]}>When would you like to eat?*</Text>
            <View style={[styles.searchSection, mode]}>
              <Icon name="schedule" size={30} color={(isDarkmode?"white":"black")} style={{paddingRight: 10}}/>
              <TextInput
                style={styles.inputBox}
                placeholder="Enter time"
                onChangeText={(time) => {this.setState({time}, () => {
                  this.storeData('time', this.state.time)
                })}}
                underlineColorAndroid="transparent"
              />
            </View>
            </View>
            <View style={{width: '80%', alignSelf: 'center'}}>
              <Text style={[styles.header, mode]}>Budget</Text>
            </View>
            <SelectionGroup
              renderContent={this.renderButton}
              items={budgetData}
              onPress={this.budgetSelectionHandler.selectionHandler}
              isSelected={this.budgetSelectionHandler.isSelected}
              containerStyle={styles.answers}
              onItemSelected={(item) => {
                const joined = this.state.budgetArray.concat(item.optionText);
                this.setState({ budgetArray: joined }, () => {
                    this.storeData('budget', this.state.budgetArray);
                  }
                );
              }}
              onItemDeselected={(item) => {
                const array = [...this.state.budgetArray];
                var index = array.indexOf(item.optionText);
                if (index !== -1) {
                  array.splice(index, 1);
                  this.setState({ budgetArray: array }, () => {
                      this.storeData('budget', this.state.budgetArray);
                    }
                  );
                }
              }}
            />
            <View style={{width: '80%', alignSelf: 'center'}}>
              <Text style={[styles.header,mode]}>Dietary Requirements</Text>
            </View>
            <SelectionGroup
              renderContent={this.renderButton}
              items={dietData}
              onPress={this.dietSelectionHandler.selectionHandler}
              isSelected={this.dietSelectionHandler.isSelected}
              containerStyle={styles.answers}
              onItemSelected={(item) => {
                console.log(item.optionText);
                const joined = this.state.dietArray.concat(item.optionText);
                this.setState({ dietArray: joined }, () => {
                    this.storeData('diet', this.state.dietArray);
                  }
                );
              }}
              onItemDeselected={(item) => {
                const array = [...this.state.dietArray];
                var index = array.indexOf(item.optionText);
                if (index !== -1) {
                  array.splice(index, 1);
                  this.setState({ dietArray: array }, () => {
                      this.storeData('diet', this.state.dietArray);
                    }
                  );      
                }
              }}
            />
            <View style={{width: '80%', alignSelf: 'center'}}>
              <Text style={[styles.header,mode]}>Cuisine</Text>
            </View>
            <SelectionGroup
              renderContent={this.renderButton}
              items={cuisineData}
              onPress={this.cuisineSelectionHandler.selectionHandler}
              isSelected={this.cuisineSelectionHandler.isSelected}
              containerStyle={styles.answers}
              onItemSelected={(item) => {
                const joined = this.state.cuisineArray.concat(item.optionText);
                this.setState({ cuisineArray: joined }, () => {
                    this.storeData('cuisine', this.state.cuisineArray);
                  }
                );
              }}
              onItemDeselected={(item) => {
                const array = [...this.state.cuisineArray];
                var index = array.indexOf(item.optionText);
                if (index !== -1) {
                  array.splice(index, 1);
                  this.setState({ cuisineArray: array }, () => {
                      this.storeData('cuisine', this.state.cuisineArray);
                    }
                  );
                }
              }}
            />
            <View style={{width: '80%', alignSelf: 'center'}}>
              <Text style={[styles.header,mode]}>Type of Restaurant</Text>
            </View>
            <SelectionGroup
              renderContent={this.renderButton}
              items={restaurantData}
              onPress={this.restaurantSelectionHandler.selectionHandler}
              isSelected={this.restaurantSelectionHandler.isSelected}
              containerStyle={styles.answers}
              onItemSelected={(item) => {
                const joined = this.state.restaurantArray.concat(item.optionText);
                this.setState({ restaurantArray: joined }, () => {
                    this.storeData('restaurant', this.state.restaurantArray);
                  }
                );
              }}
              onItemDeselected={(item) => {
                const array = [...this.state.restaurantArray];
                var index = array.indexOf(item.optionText);
                if (index !== -1) {
                  array.splice(index, 1);
                  this.setState({ restaurantArray: array }, () => {
                      this.storeData('restaurant', this.state.restaurantArray);
                    }
                  );
                }
              }}
            />
            <View style={{width: '80%', alignSelf: 'center'}}>
              <TouchableWithoutFeedback
                title="Submit"
                onPress={this.savePreferences}>
                  <View style={[styles.submitBtn,(isDarkmode?styles.buttonColor1Dark: styles.buttonColor1)]}><Text style={(isDarkmode?styles.buttonColor1Dark: styles.buttonColor1)}>Submit</Text></View>
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>
        </View>
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
    color: 'white'
  },
  buttonColor1Dark: {
    backgroundColor: colors.accentPrimDark,
    color: colors.accentPrim
  },
  searchSection: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBox: {
    flex: 1,
    backgroundColor: '#FFF',
    height: 36,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5
  },
  submitBtn: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6B222D',
    color: '#FFF',
    borderRadius: 5,
    height: 36,
    marginTop: 5,
    marginBottom: 200
  },
  button: {
      padding: 5,
      marginTop: 5,
      marginBottom: 5,
      height: 36,
      width: '30%',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
  },
  buttonText: {
      textAlign: 'center',
      fontSize: 12
  },
  answers: {
      width: '80%',
      alignSelf: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
      flexDirection: 'row',
      flexWrap: 'wrap'
  },
  header: {
    textAlign: 'left',
    color: '#6B222D',
    fontSize: 16,
    marginTop: 10,
    width: '80%'
  },
  centerHeader: {
    textAlign: 'center',
    color: '#6B222D',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5
  }
});
