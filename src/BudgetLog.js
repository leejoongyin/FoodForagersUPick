import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, View, Text, FlatList, Alert, Dimensions} from 'react-native';
// import flatListData from './flatListData';
import Swipeout from 'react-native-swipeout';
import LogPopup from './LogPopup';
import Button from 'react-native-button';
import localController from './controller/localController';

import styles from '../style/styles';
import calculateLogTotal from './calculateLogTotal';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

var screen = Dimensions.get('window');
class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null,
            budgetList: []
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
                                    this.props.parentFlatList.getBudgetList().then((list)=>{
                                        console.log("FlatListItem: budgetList: ", list);
                                        list.splice(this.props.index, 1);
                                        this.props.parentFlatList.setBudgetList(list);
                                    })


                                    /*
                                    localController.storeData('budgetList', this.state.budgetList).then(()=>{
                                        this.props.parentFlatList.refreshFlatList(deletingRow);
                                    });
                                    */

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
                <View style={[{
                    //flex: 1,
                    backgroundColor: '#6B222D',
                    //flexDirection: "column"

                }, mode2 ]}>
                    <View style = {[{
                        //flexDirection: "row",
                        //alignItems: "stretch",
                        //textAlign: "center",
                        //backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'
                        backgroundColor: '#F2E9E0',
                        margin: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        marginBottom: 15
                    }, mode2 ]}>
                        <Text style={[left, mode2 ]}>
                            {this.props.item.date}
                        </Text>
                        <Text style={[middle, mode2 ]}>
                            {this.props.item.description}
                        </Text>
                        <Text style = {[right, mode2 ]}>
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
        budgetList: [],
        totalExpense: ''
    };
    this.addExp =  this.addExp.bind(this);
    this.getStoredData().then(() => {
        console.log('budgetList: ', this.state.budgetList);
        console.log('totalExpense:', this.state.totalExpense);
    });
}

getStoredData = async () => {
    localController.getData('budgetList').then((result) => {
        if (result == null ){
            result = [];
        }
        this.setState({budgetList: result});
    });

    localController.getData('totalExpense').then((result) => {
        this.setState({totalExpense: result});
    });
}

getBudgetList = async () => {
    return this.state.budgetList;
}

setBudgetList = async ( e ) => {
    localController.storeData('budgetList', e ).then(()=>{
        this.getStoredData().then(()=>{
            this.refs.flatList.scrollToEnd();
        });
    })
}

openModal(e) {
    this.setState({isModalVisible: e.target.isModalVisible});
}

refreshFlatList = (activeKey) => {
    this.getStoredData();
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

    render() {
        var isDarkmode = this.props.route.params.isDarkmode;
        var mode =  ( isDarkmode ? styles.darkmode: styles.lightmode );
        var mode2 = ( isDarkmode ? styles.darkmode2: styles.lightmode2 );
        var buttonColor =  ( isDarkmode ? styles.buttonColor1Dark: styles.buttonColor1 );
        var total =  0.00;
        localController.storeData('totalExpense', calculateLogTotal(this.state.budgetList));
        return (
            <View style={[{
                flex: 1,
                backgroundColor: "#F2E9E0",
                paddingHorizontal: 15
             },mode2]}>
                <Text style={[greet,mode2]}>In total, you've spent:</Text>
                <Text style={[amount,mode2]}> ${calculateLogTotal(this.state.budgetList)} </Text>
                <Button
                    style = {[{
                        fontSize: 18,
                        color: buttonColor.color,
                    }]}
                    containerStyle = {[{
                        padding: 8,
                        marginLeft: 70,
                        marginRight: 70,
                        height: 40,
                        marginTop: 10,
                        marginBottom: 20,
                        borderRadius: 6,
                        backgroundColor: buttonColor.backgroundColor
                    }]}
                    onPress ={this.addExp}
                >
                    add
                </Button>
                <Text style ={[tHistory,mode2]}>
                    Transaction History
                </Text>
                <View style = {{
                    height: 1,
                    margin: 2,
                    backgroundColor: mode2.color
                    }}>
                </View>
                    <FlatList
                        ref={"flatList"}
                        style={[{backgroundColor: '#F2E9E0'}, mode2]}
                        data={this.state.budgetList}
                        renderItem={({item, index}) =>{
                            //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`)
                            return(
                                <FlatListItem
                                    style ={[
                                        {
                                            backgroundColor: '#6B222D',
                                            //height: 100
                                        },
                                        mode2
                                    ]}
                                    item={item}
                                    index={index}
                                    parentFlatList={this}
                                    isDarkmode={isDarkmode}
                                    getBudgetList={this.getBudgetList.bind(this)}
                                    setBudgetList={this.setBudgetList.bind(this)}
                                >
                                </FlatListItem>
                            );
                        }}
                        //ListFooterComponent={()=>{return(<View style={{height: 0.15*screen.height}}/>)}}
                        >


                    </FlatList>


                <LogPopup
                    ref={'logPop'}
                    parentFlatList={this}
                    isDarkmode={isDarkmode}
                    getBudgetList={this.getBudgetList.bind(this)}
                    setBudgetList={this.setBudgetList.bind(this)}
                ></LogPopup>


            </View>
        )

    };
}


const left = {
    textAlign: 'left',
    width: '33%'
}

const middle = {
    textAlign: 'center',
    width: '33%'
}

const right = {
    textAlign: 'right',
    width: '33%'
}

const greet = {
    textAlign: 'center',
    //left: '50%',
    color: '#6B222D',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
}

const amount = {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    //left: '50%',
}

const tHistory = {
    textAlign: 'left',
    marginBottom: 10
}

const addNew = {
    textAlign: 'center',
}

const button ={
    //alignContent: 'center',
    //alignItems: 'center',
    //justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#6B222D',
    color: '#FFF',
    borderRadius: 10,
    height: 36,
    marginTop: 10,
    marginBottom: 20
}
