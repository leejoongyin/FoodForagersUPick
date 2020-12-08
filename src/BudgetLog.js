import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { View, Text, FlatList, Alert, Dimensions} from 'react-native';
import flatListData from './flatListData';
import Swipeout from 'react-native-swipeout';
import LogPopup from './LogPopup';
import Button from 'react-native-button';

import styles from '../style/styles';
import calculateLogTotal from './calculateLogTotal';

var screen = Dimensions.get('window');
class FlatListItem extends Component {
constructor(props) {
    super(props);
    this.state = {
        activeRowKey: null
    }

}

render() {
    var isDarkmode = this.props.isDarkmode;
    var mode =  ( isDarkmode ? styles.darkmode: styles.lightmode );
    var mode2 = ( isDarkmode ? styles.darkmode2: styles.lightmode2 );
    const swipeSettings = {
        autoClose: true,
        onClose: (secId, rowId, direction) => {
            if(this.state.activeRowKey != null) {
                this.setState({activeRowKey: null});
            }
        },
        onOpen: (secId, rowId, direction) => {
            this.setState({activeRowKey: this.props.item.key})
        },
        right: [
            {
                onPress: () => {
                    const deletingRow = this.state.activeRowKey;
                    Alert.alert (
                        'Alert',
                        'Are you sure you want to delete?',
                        [
                            {text: 'No', onPress: () => console.log('cancel Pressed'), style: 'cancel'},
                            {text: 'Yes', onPress: () => {
                                flatListData.splice(this.props.index, 1);
                                this.props.parentFlatList.refreshFlatList(deletingRow);
                            }},
                        ],
                        {cancelable: true}
                    )
                },
                text: 'Delete', type: 'delete'
            }
        ],
        rowId: this.props.index,
        sectionId: 1
    }

    return (
        <Swipeout {...swipeSettings}>
            <View style={ mode2 }>
                <View style = { mode2 }>
                    <Text style={[styles.budgetLeft, mode2 ]}>
                        {this.props.item.date}
                    </Text>
                    <Text style={[styles.budgetMiddle, mode2 ]}>
                        {this.props.item.description}
                    </Text>
                    <Text style = {[styles.budgetRight, mode2 ]}>
                        {this.props.item.amount}
                    </Text>

                </View>
                <View style = {[{
                    height: 1,
                    backgroundColor: "gray"
                }, mode2 ]}>
                </View>
            </View>
        </Swipeout>

    );
}
}

export default class BudgetLog extends Component {
constructor(props){

    super(props);

    this.state = {
        deletedRowKey: null,
        amount: '',
        description: '',
        date: '',
    };
    this.addExp =  this.addExp.bind(this);
}

openModal(e) {
    this.setState({isModalVisible: e.target.isModalVisible});
}

refreshFlatList = (activeKey) => {
    this.setState((prevState) => {
        return {
            deletedRowKey: activeKey
        };
    });
    this.refs.flatList.scrollToEnd();
}

    addExp () {
        //alert("You add Item")
        this.refs.logPop.showLogPop();
    }

    calculateTotal = () => {

    }

    render() {
        var isDarkmode = this.props.route.params.isDarkmode;
        var mode =  ( isDarkmode ? styles.darkmode: styles.lightmode );
        var mode2 = ( isDarkmode ? styles.darkmode2: styles.lightmode2 );
        var buttonColor =  ( isDarkmode ? styles.buttonColor1Dark: styles.buttonColor1 );
        var total =  0.00;
        return (
            <View style={[styles.budgetContainer, mode2]}>
                <Text style={[styles.budgetGreet, mode2]}>This month, you've spent:</Text>
                <Text style={[styles.budgetAmount, mode2]}> ${calculateLogTotal()} </Text>
                <Button
                    style = {[styles.budgetButton, buttonColor]}
                    containerStyle = {[styles.budgetButtonContainer, buttonColor]}
                    onPress ={this.addExp}
                >
                    Add Expense
                </Button>
                <Text style ={[styles.budgettHistory, mode2]}>
                    Transaction History
                </Text>
                <View style = {{
                    height: 1,
                    margin: 2,
                    backgroundColor: mode2.color
                    }}>
                </View>
                <LogPopup ref={'logPop'} parentFlatList={this} isDarkmode={isDarkmode}>

                </LogPopup>
                <View style={[ styles.budgetTransactionContainer, mode2 ]}>
                    <FlatList
                        ref={"flatList"}
                        style={ mode2 }
                        data={flatListData}
                        renderItem={({item, index}) =>{
                            //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`)
                            return(
                                <FlatListItem
                                    style={ mode2 }
                                    item={item}
                                    index={index}
                                    parentFlatList={this} 
                                    isDarkmode={isDarkmode}
                                >
                                </FlatListItem>
                            );
                        }}>

                    </FlatList>

                </View>
                
            </View>
        )

    };
}