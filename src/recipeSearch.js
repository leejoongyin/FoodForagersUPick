import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
import DateTimePicker from '@react-native-community/datetimepicker';

const MAX_SELECT = 10;


export default class RecipeSearch extends Component {

  constructor(props) {
    super(props);
    this.budgetSelectionHandler = new SelectionHandler({ maxMultiSelect: MAX_SELECT, allowDeselect: true, defaultSelection: null });
    this.dietSelectionHandler = new SelectionHandler({ maxMultiSelect: MAX_SELECT, allowDeselect: true, defaultSelection: null });
    this.cuisineSelectionHandler = new SelectionHandler({ maxMultiSelect: MAX_SELECT, allowDeselect: true, defaultSelection: null });
    this.restaurantSelectionHandler = new SelectionHandler({ maxMultiSelect: MAX_SELECT, allowDeselect: true, defaultSelection: null });
    this.state = {
        selectedItems: null
    };
  }

  onItemSelected = (item, allSelectedItems) => {
    this.setState({ selectedItems: allSelectedItems });
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
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '80%', margin: 'auto', marginTop: 50, marginBottom: 50 }}>
        <Text style={styles.centerHeader}>Search for a Recipe</Text>
        <TextInput
          placeholder="Enter a Recipe"
          style={styles.inputBox}
        />
        <Text style={styles.centerHeader}>When would you like to eat?*</Text>
        <TextInput
          placeholder="Enter time"
          style={styles.inputBox}
        />
        <TouchableWithoutFeedback
          title="Submit"
          onPress={() => this.savePreferences}>
            <View style={styles.submitBtn}><Text style={{color: '#FFF'}}>Submit</Text></View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#FFF',
    width: '80%',
    height: 36,
    paddingLeft: 5,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    alignContent: 'center',
    alignItems: 'center',
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
    fontSize: 14
  },
  centerHeader: {
    width: '80%',
    textAlign: 'center',
    color: '#6B222D',
    fontSize: 14
  }
});
