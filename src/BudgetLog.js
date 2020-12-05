import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, View, Text, FlatList, Alert, Dimensions} from 'react-native';
import flatListData from './flatListData';
import Swipeout from 'react-native-swipeout';
import LogPopup from './LogPopup';
import Button from 'react-native-button';

var screen = Dimensions.get('window');
class FlatListItem extends Component {
constructor(props) {
    super(props);
    this.state = {
        activeRowKey: null
    }

}

render() {
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
            <View style={{
                //flex: 1,
                backgroundColor: '#6B222D',
                //flexDirection: "column"
            }}>
            <View style = {{
                //flexDirection: "row",
                //alignItems: "stretch",
                //textAlign: "center",
                //backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'
                backgroundColor: '#F2E9E0'
            }}>
                <Text style={left}>
                    {this.props.item.date} 
                </Text>
                <Text style={middle}>
                    {this.props.item.description} 
                </Text>
                <Text style = {right}>
                    {this.props.item.amount} 
                </Text>

            </View> 
            <View style = {{
                height: 1,
                backgroundColor: "gray"
            }}>
            </View>              
            </View>               
        </Swipeout>

    );
}
}

export default class BudgetLog extends React.Component {
constructor(props){

    super(props);

    state = {
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

    render() {
    var total =  0.00;
        return (
            <View style={{
                backgroundColor: "#F2E9E0",
                //height: screen.height
             }}>
                <Text style={greet}>This month, you've spent:</Text>
                <Text style={amount}> ${total} </Text>
                <Button 
                style = {{ 
                    fontSize: 18, 
                    color: 'white',
                }}
                containerStyle = {{
                    padding: 8,
                    marginLeft: 70,
                    marginRight: 70,
                    height: 40,
                    marginTop: 10,
                    marginBottom: 20,
                    borderRadius: 6,
                    backgroundColor: '#6B222D'
                }}
                onPress ={this.addExp}
                >
                    add
                </Button>
                <Text style ={tHistory}>
                    Transction History
                </Text>
                <View style = {{
                    height: 1,
                    backgroundColor: "black"
                    }}>
                </View>
                <View style={{backgroundColor: '#F2E9E0', height: screen.height}}>
                    <FlatList
                        ref={"flatList"}
                        style={{backgroundColor: '#F2E9E0',}}
                        data={flatListData}
                        renderItem={({item, index}) =>{
                            //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`)
                            return(
                                <FlatListItem 
                                    style ={{backgroundColor: '#6B222D',
                                    //height: 100

                                }}
                                item={item} 
                                index={index} 
                                parentFlatList={this} >

                                </FlatListItem>
                            );
                        }}>

                    </FlatList>

                </View>
                <LogPopup ref={'logPop'} parentFlatList={this}>

                </LogPopup>
            </View>
        )

    }; 
}


const left = {
    textAlign: 'left',
}

const middle = {
    textAlign: 'center',
}

const right = {
    textAlign: 'right',
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
    fontWeight: 'Bold',
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

