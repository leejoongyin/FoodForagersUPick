import React, { Component } from 'react';
import { Text, Dimensions, TextInput } from 'react-native'
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import styles from '../style/styles';
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
                        <Text style={styles.popUptext}>Add new expense </Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder= '$ Amount'
                            keyboardType = 'numeric'
                            onChangeText={(text) => this.setState({newAmount: filterAmountInput(text) })}
                            value={this.state.newAmount}/>

                        <TextInput
                            style={styles.input}
                            placeholder= 'Description'
                            onChangeText={(text) => this.setState({newDescription: text})}
                            value={this.state.newDescription}/>

                        <TextInput
                            style={styles.input}
                            placeholder='Date (MM/DD/YYYY)'
                            onChangeText={(text) => this.setState({newDate: text})}
                            value={this.state.newDate}/>
                        <Button
                            style={styles.logPopupButton}
                            containerStyle={styles.logPopupButtonContainer}
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
