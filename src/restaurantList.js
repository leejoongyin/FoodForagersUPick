//import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import { Text, View, TextInput, ScrollView, TouchableWithoutFeedback} from 'react-native';
//import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';
import styles from '../style/styles';

export default class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantListArray: this.props.route.params.getRestaurantList(),
      userInput: '',
    };
  }

  handleText = (text) =>{
    this.setState({userInput: text})
    /*alert(this.state.userInput)*/
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
    this.props.route.params.setRestaurantList(this.state.restaurantListArray);
    this.props.navigation.navigate('Group Accommodations');
  }
  // TODO: Replace hardcoded colors with light mode/dark mode
  render() {

    var isDarkmode = this.props.route.params.isDarkmode;
    var mode = (isDarkmode ? styles.darkmode: styles.lightmode );
    var buttonColor = (isDarkmode?styles.buttonColor1Dark:styles.buttonColor1);

    return (
      <View style={[styles.resListContainer, mode]}>
        <View style={{width: '80%'}}>
          <Text style={[ styles.resListPrompt, mode]}>
            {"Enter the restaurants you are deciding between:"}
          </Text>
        </View>
        <TextInput value={this.state.userInput}
          /*defaultValue = {this.state.restaurantListArray}*/
          style={ styles.resListTextInput }
          placeholder="Type restaurants here and hit enter to add to list"
          onChangeText={this.handleText}
          onSubmitEditing={this.addItem}
        />
        <View style={[ styles.resListInputContainer, mode]}>
          <ScrollView style={ styles.resListInputScrollView}>
            {this.state.restaurantListArray.map((item) => {
              return(
                  <View style={styles.resListViewItem}>
                    <Text style={styles.resListTextItem}>{item}</Text>
                    <View style = {{flexDirection: 'row-reverse'}}>
                      <View style={{paddingRight: 5}}/>
                      <TouchableWithoutFeedback onPress={() => this.pressHandler(item)}>
                        <MaterialIcons name='delete' size={28} color='#6b222d'/>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
              )
            })}
          </ScrollView>
        </View>
        <TouchableWithoutFeedback onPress={this.submit}>
          <View style={[ styles.resListSubmitContainer, buttonColor]}>
            <Text style={[ styles.resListSubmitText, buttonColor]}>Submit</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
};
