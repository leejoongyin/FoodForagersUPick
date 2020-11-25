import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';

const MAX_SELECT = 10;

export default class Preferences extends Component {
  
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

    const dietaryRequirements = [
      { id: 4, optionText: 'Lactose intolerant' },
      { id: 5, optionText: 'Nut allergy' },
      { id: 6, optionText: 'Shellfish allergy' },
      { id: 7, optionText: 'Vegan' },
      { id: 8, optionText: 'Vegetarian' },
      { id: 9, optionText: 'Kosher' }, 
      { id: 10, optionText: 'Paleo' }
    ];

    const cuisine = [
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

    const restaurant = [
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '80%', margin: 'auto' }}>
        <Text style={styles.centerHeader}>Where would you like to eat?*</Text>
        <TextInput
          placeholder="Enter zipcode"
          style={styles.inputBox}
        />
        <Text style={styles.centerHeader}>When would you like to eat?*</Text>
        <TextInput
          placeholder="Enter time"
          style={styles.inputBox}
        />
        <Text style={styles.header}>Budget</Text>
        <SelectionGroup 
          renderContent={this.renderButton}
          items={budgetData}
          onPress={this.budgetSelectionHandler.selectionHandler}
          isSelected={this.budgetSelectionHandler.isSelected}
          containerStyle={styles.answers}
          onItemSelected={(item) => this.setState({ selectedAnswer: item })}
          onItemDeselected={(item, selectedItems) => this.setState({selectedAnswer: null})}
        />
        <Text style={styles.header}>Dietary Requirements</Text>
        <SelectionGroup 
          renderContent={this.renderButton}
          items={dietaryRequirements}
          onPress={this.dietSelectionHandler.selectionHandler}
          isSelected={this.dietSelectionHandler.isSelected}
          containerStyle={styles.answers}
          onItemSelected={(item) => this.setState({ selectedAnswer: item })}
          onItemDeselected={(item, selectedItems) => this.setState({selectedAnswer: null})}
        />
        <Text style={styles.header}>Cuisine</Text>
        <SelectionGroup 
          renderContent={this.renderButton}
          items={cuisine}
          onPress={this.cuisineSelectionHandler.selectionHandler}
          isSelected={this.cuisineSelectionHandler.isSelected}
          containerStyle={styles.answers}
          onItemSelected={(item) => this.setState({ selectedAnswer: item })}
          onItemDeselected={(item, selectedItems) => this.setState({selectedAnswer: null})}
        />
        <Text style={styles.header}>Type of Restaurant</Text>
        <SelectionGroup 
          renderContent={this.renderButton}
          items={restaurant}
          onPress={this.restaurantSelectionHandler.selectionHandler}
          isSelected={this.restaurantSelectionHandler.isSelected}
          containerStyle={styles.answers}
          onItemSelected={(item) => this.setState({ selectedAnswer: item })}
          onItemDeselected={(item, selectedItems) => this.setState({selectedAnswer: null})}
        />
        <Text style={styles.header}>Rating</Text>
        <Button title="Go back" onPress={() => this.props.navigation.goBack()} />
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