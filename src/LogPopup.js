import React, { Component } from 'react';
import {
    AppRegistry, FlatList, StylSheet, Text, View, Image, Alert,
    Platform, TouchableHighLight, Dimensions, TextInput
} from 'react-native'
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from './flatListData';
import { filterAmountInput } from './filterInput';

var screen = Dimensions.get('window');
export default class LogPopup extends Component {
        constructor(props){
            super(props);

            this.state = {
                newAmount: '',
                newDescription: '',
                newDate: '',
            }
        }

        showLogPop = () => {
            this.refs.popUp.open();
        }
        generateKey = (numberOfCharacters) => {
            return require('random-string')({length: numberOfCharacters});
        }
        render() {
            return (
                <Modal
                    ref={"popUp"}
                    style ={{    
                        justifyContent: 'center',
                        borderRadius: 5,
                        shadowRadius: 10,
                        width: screen.width - 80,
                        height: 300,
                        bottom: Dimensions.get('window').height/2 - 100,
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
                            keyboardType = 'numeric'
                            onChangeText={(text) => this.setState({newAmount: filterAmountInput(text) })}
                            value={this.state.newAmount}/>

                        <TextInput
                            style={_input}
                            placeholder= 'Description'
                            onChangeText={(text) => this.setState({newDescription: text})}
                            value={this.state.newDescription}/>

                        <TextInput
                            style={_input}
                            placeholder='Date (MM/DD/YYYY)'
                            onChangeText={(text) => this.setState({newDate: text})}
                            value={this.state.newDate}/>
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
                                    || this.state.newDate.length == 0){
                                        alert("You must fill in all the fields");
                                        return;
                                    }
                                    const newKey = this.generateKey(4);
                                    const newLog = {
                                        key: newKey,
                                        amount: this.state.newAmount,
                                        description: this.state.newDescription,
                                        date: this.state.newDate
                                    };
                                    flatListData.push(newLog);
                                    this.props.parentFlatList.refreshFlatList(newKey);
                                    this.refs.popUp.close();
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
