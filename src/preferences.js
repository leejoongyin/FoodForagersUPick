import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import { Alert, Text, View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";

import colors from '../style/colors';
import styles from '../style/styles';
import validateZip from '../model/validateZip';

import { ThemeProvider } from '@react-navigation/native';

const MAX_SELECT = 10;
const now = new Date();



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
        time: null,
        showTimepicker: false,
        selectedItems: null,
        budgetArray: [],
        dietArray: [],
        cuisineArray: [],
        restaurantArray: [],
        text : '',
        loading: true,
    };
    this.isDarkmode = this.props.isDarkmode;
    this.getStoredData();
  }

  getStoredData = async () => {
    const budgetData = [
      { id: 1, optionText: '$' },
      { id: 2, optionText: '$$' },
      { id: 3, optionText: '$$$' }
    ];

    const dietData = [
      { id: 1, optionText: 'Vegan' },
      { id: 2, optionText: 'Vegetarian' },
      { id: 3, optionText: 'Kosher' },
      { id: 4, optionText: 'Halal' },
      { id: 5, optionText: 'Gluten free' }
    ];

    const cuisineData = [
      { id: 1, optionText: 'Chinese' },
      { id: 2, optionText: 'American' },
      { id: 3, optionText: 'Mexican' },
      { id: 4, optionText: 'Italian' },
      { id: 5, optionText: 'Japanese' },
      { id: 6, optionText: 'Korean' },
      { id: 7, optionText: 'Thai' },
      { id: 8, optionText: 'Vietnamese' },
      { id: 9, optionText: 'Indian' }
    ];

    const restaurantData = [
      { id: 1, optionText: 'Breakfast' },
      { id: 2, optionText: 'Brunch' },
      { id: 3, optionText: 'Bars' },
      { id: 4, optionText: 'Fast Food' },
      { id: 5, optionText: 'Dessert' },
      { id: 6, optionText: 'Bubble tea' },
      { id: 7, optionText: 'Coffee Shops' },
      { id: 8, optionText: 'BBQ' }
    ];
    await this.getData('zipcode').then((result) => {
        this.setState({zipcode: result});
        console.log('zipcode: ', this.state.zipcode);
    });
    await this.getData('time').then((result) => {
        let storedTime = new Date(result);
        if (storedTime < now) {
          storedTime = null;
        }
        this.setState({time: storedTime});
        console.log('time: ', this.state.time);
    });
    await this.getData('budget').then((result) => {
        this.setState({budgetArray: result });
        if (this.state.budgetArray != null) {
          for (let budget of this.state.budgetArray) {
            let index = budgetData.find(x => x.optionText === budget).id - 1;
            this.budgetSelectionHandler.selectionHandler(index)
          }
        } else {
          this.setState({budgetArray: []});
        }
        console.log('budget: ', this.state.budgetArray);
    });
    await this.getData('diet').then((result) => {
        this.setState({dietArray: result});
        if (this.state.dietArray != null) {
          for (let diet of this.state.dietArray) {
            let index = dietData.find(x => x.optionText === diet).id - 1;
            this.dietSelectionHandler.selectionHandler(index)
          }
        } else {
          this.setState({dietArray: []});
        }
        console.log('diet: ', this.state.dietArray);
    });
   await this.getData('cuisine').then((result) => {
        this.setState({cuisineArray: result});
        if (this.state.cuisineArray != null) {
          for (let cuisine of this.state.cuisineArray) {
            let index = cuisineData.find(x => x.optionText === cuisine).id - 1;
            this.cuisineSelectionHandler.selectionHandler(index)
          }
        } else {
          this.setState({cuisineArray: []});
        }
        console.log('cuisine: ', this.state.cuisineArray);
    });
    await this.getData('restaurant').then((result) => {
        this.setState({restaurantArray: result});
        if (this.state.restaurantArray != null) {
          for (let rest of this.state.restaurantArray) {
            let index = restaurantData.find(x => x.optionText === rest).id - 1;
            this.restaurantSelectionHandler.selectionHandler(index)
          }
        } else {
          this.setState({restaurantArray: []});
        }
        console.log('restauarnt: ', this.state.restaurantArray);
        this.setState({loading: false});
    });
  }

  // If the user somehow inputs non-numeric characters, remove them.
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

  handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      if (selectedTime < now) {
        selectedTime.setDate(selectedTime.getDate() + 1);
      }
      this.setState({time: selectedTime, showTimepicker: false}, () => {
        this.storeData('time', this.state.time);
      });
    } else {
      this.setState({showTimepicker: false});
    }
  }

  savePreferences = () => {
    if (this.state.time && validateZip(this.state.zipcode)) {
      this.props.navigation.navigate('Group Accommodations');
    } else {
      Alert.alert('Error','Please enter all required fields.');
    }
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
      const jsonValue = await AsyncStorage.getItem(key).then((key) => {return key;})
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
        style={[styles.prefButton,
        { backgroundColor: isSelected ? '#A6433F' : '#FFF'}]}>
        <Text style={[styles.prefButtonText, {color: isSelected ? '#FFF' : '#000'}]}>{data.optionText}</Text>
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
      { id: 1, optionText: 'Vegan' },
      { id: 2, optionText: 'Vegetarian' },
      { id: 3, optionText: 'Kosher' },
      { id: 4, optionText: 'Halal' },
      { id: 5, optionText: 'Gluten free' }
    ];

    const cuisineData = [
      { id: 1, optionText: 'Chinese' },
      { id: 2, optionText: 'American' },
      { id: 3, optionText: 'Mexican' },
      { id: 4, optionText: 'Italian' },
      { id: 5, optionText: 'Japanese' },
      { id: 6, optionText: 'Korean' },
      { id: 7, optionText: 'Thai' },
      { id: 8, optionText: 'Vietnamese' },
      { id: 9, optionText: 'Indian' }
    ];

    const restaurantData = [
      { id: 1, optionText: 'Breakfast' },
      { id: 2, optionText: 'Brunch' },
      { id: 3, optionText: 'Bars' },
      { id: 4, optionText: 'Fast Food' },
      { id: 5, optionText: 'Dessert' },
      { id: 6, optionText: 'Bubble tea' },
      { id: 7, optionText: 'Coffee Shops' },
      { id: 8, optionText: 'BBQ' }
    ];

    return (
      <View style={[styles.container, mode, styles.prefContainer]}>
        <View style={{width: '100%'}}>
          {!this.state.loading && (
          <ScrollView>
            <View style={styles.prefLabels}>
            <Text style={[styles.prefCenterHeader, mode, {marginTop: 10}]}>Where would you like to eat?*</Text>
            <Text style={[styles.prefCenterHeader, {marginTop: 0}, (isDarkmode ? {color: 'yellow'} : {color: 'brown'}), (!this.state.zipErrorText.length ? {marginBottom: 0, height: 0} : {height: 'auto'}) ]}>
              {this.state.zipErrorText}
            </Text>
            <View style={[styles.prefSearchSection, mode]}>
              <Icon name="place" size={30} color={(isDarkmode?"white":"black")} style={{paddingRight: 10}}/>
              <TextInput
                ref={input => { this.zipcodeInput = input }}
                style={styles.prefInputBox}
                keyboardType='numeric'
                placeholder="Enter zipcode"
                placeholderTextColor='lightgray'
                onChangeText={(zipcode) => {this.onZipInput(zipcode)}}
                value={this.state.zipcode}
                onBlur={() => {this.onZipBlur()}}
                maxLength={5}
                underlineColorAndroid="transparent"
              />
            </View>

            <Text style={[styles.prefCenterHeader, mode]}>When would you like to eat?*</Text>
            <View style={[styles.prefSearchSection, mode]}>
              <Icon name="schedule" size={30} color={(isDarkmode?"white":"black")} style={{paddingRight: 10}}/>
              <TouchableWithoutFeedback onPress={() => this.setState({showTimepicker: true})}>
                <Text style={[styles.prefInputBox, (this.state.time ? {color: 'black'} : {color: 'lightgray'})]}>
                {this.state.time ? format(this.state.time, "MMMM do, yyyy h:mm a") : "Enter time"}
                </Text>
              </TouchableWithoutFeedback>
            </View>
            {this.state.showTimepicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={this.handleTimeChange}
              />
            )}
            </View>
            <View style={styles.prefLabels}>
              <Text style={[styles.prefHeader, mode]}>Budget</Text>
            </View>
            <SelectionGroup
              renderContent={this.renderButton}
              items={budgetData}
              onPress={this.budgetSelectionHandler.selectionHandler}
              isSelected={this.budgetSelectionHandler.isSelected}
              containerStyle={styles.prefAnswers}
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
            <View style={styles.prefLabels}>
              <Text style={[styles.prefHeader,mode]}>Dietary Requirements</Text>
            </View>
            <SelectionGroup
              renderContent={this.renderButton}
              items={dietData}
              onPress={this.dietSelectionHandler.selectionHandler}
              isSelected={this.dietSelectionHandler.isSelected}
              containerStyle={styles.prefAnswers}
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
            <View style={styles.prefLabels}>
              <Text style={[styles.prefHeader,mode]}>Cuisine</Text>
            </View>
            <SelectionGroup
              renderContent={this.renderButton}
              items={cuisineData}
              onPress={this.cuisineSelectionHandler.selectionHandler}
              isSelected={this.cuisineSelectionHandler.isSelected}
              containerStyle={styles.prefAnswers}
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
            <View style={styles.prefLabels}>
              <Text style={[styles.prefHeader,mode]}>Type of Restaurant</Text>
            </View>
            <SelectionGroup
              renderContent={this.renderButton}
              items={restaurantData}
              onPress={this.restaurantSelectionHandler.selectionHandler}
              isSelected={this.restaurantSelectionHandler.isSelected}
              containerStyle={styles.prefAnswers}
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
            <View style={styles.prefLabels}>
              <TouchableWithoutFeedback
                title="Submit"
                onPress={this.savePreferences}>
                  <View style={[styles.prefSubmitBtn,(isDarkmode?styles.buttonColor1Dark: styles.buttonColor1)]}><Text style={(isDarkmode?styles.buttonColor1Dark: styles.buttonColor1)}>Submit</Text></View>
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>)}
        </View>
      </View>
    );
  }
};