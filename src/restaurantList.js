import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MAX_SELECT = 10;


export default class RestaruantList extends Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 'auto', paddingLeft: 10, paddingRight: 10}}>
        <Text style={{padding: 10, fontSize: 20, color: '#6b222d', textAlign: 'center'}}>{"Enter the restaurants you are deciding between:"}</Text>
        <TextInput
          style={{height: 40, paddingLeft: 10, width: '85%', fontStyle: 'italic', backgroundColor: 'white'}}
          placeholder="Type restaurants here and hit enter to add to list"
          onChangeText={text => this.setState({text})}
        />
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
