import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MAX_SELECT = 10;


export default class Preferences extends Component {
  
  constructor(props) {
    super(props);
    this.budgetSelectionHandler = new SelectionHandler({ maxMultiSelect: MAX_SELECT, allowDeselect: true, defaultSelection: null });
    this.dietSelectionHandler = new SelectionHandler({ maxMultiSelect: MAX_SELECT, allowDeselect: true, defaultSelection: null });
    this.cuisineSelectionHandler = new SelectionHandler({ maxMultiSelect: MAX_SELECT, allowDeselect: true, defaultSelection: null });
    this.restaurantSelectionHandler = new SelectionHandler({ maxMultiSelect: MAX_SELECT, allowDeselect: true, defaultSelection: null });
    this.state = {
        selectedItems: null,
        budgetArray: [],
        dietArray: [],
        cuisineArray: [],
        restaurantArray: []
    };
  }

  savePreferences = () => {
    alert('saved preferences');
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '80%', margin: 'auto', marginTop: 50, marginBottom: 50 }}>
        <Text style={styles.centerHeader}>Where would you like to eat?*</Text>
        <View style={styles.searchSection}>
          <Icon name="place" size={30} color="#000" style={{padding: 10}}/>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter zipcode"
            onChangeText={(zipcode) => {this.setState({zipcode})}}
            underlineColorAndroid="transparent"
          />
        </View>
        <Text style={styles.centerHeader}>When would you like to eat?*</Text>
        <View style={styles.searchSection}>
          <Icon name="schedule" size={30} color="#000" style={{padding: 10}}/>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter time"
            onChangeText={(zipcode) => {this.setState({zipcode})}}
            underlineColorAndroid="transparent"
          />
        </View>
        <Text style={styles.header}>Budget</Text>
        <SelectionGroup 
          renderContent={this.renderButton}
          items={budgetData}
          onPress={this.budgetSelectionHandler.selectionHandler}
          isSelected={this.budgetSelectionHandler.isSelected}
          containerStyle={styles.answers}
          onItemSelected={(item) => {
            const joined = this.state.budgetArray.concat(item.optionText);
            this.setState({ budgetArray: joined });
            alert(this.state.budgetArray);
          }}
          onItemDeselected={(item) => {
            const array = [...this.state.budgetArray];
            var index = array.indexOf(item.optionText);
            if (index !== -1) {
              array.splice(index, 1);
              this.setState({budgetArray: array});
            }
            alert(this.state.budgetArray);
          }}
        />
        <Text style={styles.header}>Dietary Requirements</Text>
        <SelectionGroup 
          renderContent={this.renderButton}
          items={dietData}
          onPress={this.dietSelectionHandler.selectionHandler}
          isSelected={this.dietSelectionHandler.isSelected}
          containerStyle={styles.answers}
          onItemSelected={(item) => {
            const joined = this.state.dietArray.concat(item.optionText);
            this.setState({ dietArray: joined });
          }}
          onItemDeselected={(item) => {
            const array = [...this.state.dietArray];
            var index = array.indexOf(item.optionText);
            if (index !== -1) {
              array.splice(index, 1);
              this.setState({dietArray: array});
            }
          }}
        />
        <Text style={styles.header}>Cuisine</Text>
        <SelectionGroup 
          renderContent={this.renderButton}
          items={cuisineData}
          onPress={this.cuisineSelectionHandler.selectionHandler}
          isSelected={this.cuisineSelectionHandler.isSelected}
          containerStyle={styles.answers}
          onItemSelected={(item) => {
            const joined = this.state.cuisineArray.concat(item.optionText);
            this.setState({ cuisineArray: joined });
          }}
          onItemDeselected={(item) => {
            const array = [...this.state.cuisineArray];
            var index = array.indexOf(item.optionText);
            if (index !== -1) {
              array.splice(index, 1);
              this.setState({cuisineArray: array});
            }
          }}
        />
        <Text style={styles.header}>Type of Restaurant</Text>
        <SelectionGroup 
          renderContent={this.renderButton}
          items={restaurantData}
          onPress={this.restaurantSelectionHandler.selectionHandler}
          isSelected={this.restaurantSelectionHandler.isSelected}
          containerStyle={styles.answers}
          onItemSelected={(item) => {
            const joined = this.state.restaurantArray.concat(item.optionText);
            this.setState({ restaurantArray: joined });
          }}
          onItemDeselected={(item) => {
            const array = [...this.state.restaurantArray];
            var index = array.indexOf(item.optionText);
            if (index !== -1) {
              array.splice(index, 1);
              this.setState({restaurantArray: array});
            }
          }}
        />
        <TouchableWithoutFeedback
          title="Submit"
          onPress={this.savePreferences}>
            <View style={styles.submitBtn}><Text style={{color: '#FFF'}}>Submit</Text></View>
        </TouchableWithoutFeedback>
      </View>
    );
  } 
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 5,
    width: '80%'
  },
  inputBox: {
    flex: 1,
    backgroundColor: '#FFF',
    height: 36,
    paddingLeft: 5,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  submitBtn: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#6B222D',
    color: '#FFF',
    borderRadius: 5,
    width: '80%',
    height: 36
  },
  button: {
      padding: 5,
      marginTop: 5,
      marginBottom: 5,
      height: 36,
      width: '30%',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
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
    width: '80%',
    textAlign: 'left',
    color: '#6B222D',
    fontSize: 16,
    marginTop: 10
  },
  centerHeader: {
    width: '80%',
    textAlign: 'center',
    color: '#6B222D',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5
  }
});