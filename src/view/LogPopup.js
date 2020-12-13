import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StylSheet, Text, View, Image, Alert,
    Platform, TouchableHighLight, Dimensions, TextInput, TouchableWithoutFeedback
} from 'react-native'
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";

import { filterAmountInput } from '../controller/filterInput';
import localController from '../controller/localController';

var screen = Dimensions.get('window');
export default class LogPopup extends Component {
        constructor(props){
            super(props);

            this.state = {
                newAmount: '',
                newDescription: '',
                newDate: null,
                budgetList: [],
                showTimepicker: false,
            }
        }

        showLogPop = () => {
            this.refs.popUp.open();
        }

        generateKey = (numberOfCharacters) => {
            return require('random-string')({length: numberOfCharacters});
        }

        handleTimeChange = (event, date) => {
          if (date) {
            this.setState({newDate: date, showTimepicker: false});
          } else {
            this.setState({showTimepicker: false});
          }
        }

        render() {
            return (
                <Modal
                    ref={"popUp"}
                    style ={{
                        marginTop: 100,
                        justifyContent: 'center',
                        borderRadius: 5,
                        shadowRadius: 10,
                        width: '80%',
                        height: 300,
                        bottom: Dimensions.get('window').height / 2 - Math.min(400, Dimensions.get('window').height)/2 ,
                    }}
                        position='center'
                        backdrop={true}
                        onClosed = {() => {
                           // alert("Modal closed");
                        }}
                    >
                        <Text style={popUptext}>Add new expense </Text>
                        <TextInput
                            style={_input}
                            placeholder= '$ Amount'
                            placeholderTextColor='lightgray'
                            keyboardType = 'numeric'
                            onChangeText={(text) => this.setState({newAmount: filterAmountInput(text) })}
                            value={this.state.newAmount}/>
                        <TextInput
                            style={_input}
                            placeholder= 'Description'
                            placeholderTextColor='lightgray'
                            onChangeText={(text) => this.setState({newDescription: text})}
                            value={this.state.newDescription}/>
                        <View style={_input}>
                          <TouchableWithoutFeedback onPress={() => this.setState({showTimepicker: true})}>
                              <Text style={[{marginTop: 10}, (this.state.newDate ? {color: 'black'} : {color: 'lightgray'})]}>
                              {this.state.newDate ? format(this.state.newDate, "M/dd/yyyy") : "Date (MM/DD/YYYY)"}
                              </Text>
                          </TouchableWithoutFeedback>
                        </View>
                        {this.state.showTimepicker && (
                          <DateTimePicker
                            value={new Date()}
                            mode={'date'}
                            display="default"
                            onChange={this.handleTimeChange}
                          />
                        )}
                        <Button
                            style={{ fontSize: 18, color: 'white'}}
                            containerStyle={{
                                padding: 8,
                                marginLeft: 70,
                                marginRight: 70,
                                height: 40,
                                borderRadius: 6,
                                backgroundColor: '#6B222D'
                            }}
                            onPress={() => {
                                if(this.state.newAmount.length == 0 || this.state.newDescription.length == 0
                                    || !this.state.newDate){
                                        alert("You must fill in all the fields");
                                        return;
                                    }
                                    const newKey = this.generateKey(5);
                                    const newLog = {
                                        key: newKey,
                                        amount: this.state.newAmount,
                                        description: this.state.newDescription,
                                        date: format(this.state.newDate, "M/dd/yyyy")
                                    };
                                    console.log(newLog)
                                    this.props.getBudgetList().then((budget)=>{
                                        console.log(budget);
                                        budget.unshift(newLog);
                                        console.log(budget);
                                        this.props.setBudgetList(budget)
                                        this.refs.popUp.close();
                                    });
                            }}
                        >
                            Add
                        </Button>
                    </Modal>
            );
        }
}

const popUptext = {
    fontSize: 16,
    frontWeight: 'bold',
    textAlign: 'center',
    //marginTop: 10
}

const _input = {
    height: 40,
    borderBottomColor: 'gray',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1
}
