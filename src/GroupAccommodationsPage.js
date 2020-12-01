
import React, {Component} from 'react';
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, Switch, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


import './Navbar';
import '../assets/CameraIcon.png'
import Navbar from './Navbar';
import styles from '../style/styles';
import db from './base';

class EatingAlone extends Component {
    constructor(props){
        super(props);
        const {navigation, isDarkmode}= this.props;
        const mode = (this.props.isDarkmode ? styles.darkmode: styles.lightmode);
        //console.log( "Eating Alone( isDarkmode: " + this.props.isDarkmode + ")");
    }
    render(props) {
        console.log( "Eating Alone( isDarkmode: " + this.props.isDarkmode + ")");
        var mode = (this.props.isDarkmode ? styles.darkmode: styles.lightmode);
        return(
            <View style={styles.outline, styles.containerModule}>
                <View style = {styles.padding}/>

                <View style = {styles.padding}/>
                <Text style = {[mode, styles.text]} > or get a recommendation just for you: </ Text>
                <View style = {styles.padding}/>
                <TouchableWithoutFeedback  title = 'Generate' onPress={()=>{this.props.navigation.navigate("Restaurant Info", {isDarkmode: this.props.isDarkmode})}}>
                    <View style = {[ mode, styles.buttonFocused, (this.props.isDarkmode? styles.buttonColor2Dark: styles.buttonColor1), {height: 75}  ]}>
                        <Text style = {[mode, styles.beginButtonText,  (this.props.isDarkmode? styles.buttonColor2Dark: styles.buttonColor1) ]}>
                            Generate restaurant
                        </Text>
                        <Text style = {[mode, styles.beginButtonText, (this.props.isDarkmode? styles.buttonColor2Dark: styles.buttonColor1) ]}>
                            recommendation
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );

    }
}

class QRCode extends Component {
    constructor(props){
        super(props);
    }
    render() {
        var mode = (this.props.isDarkmode ? styles.darkmode: styles.lightmode);
        return(
            <View style = {[ styles.module, styles.outline ]}>
                <Text style = {mode} > //Implement QRCode Component</ Text>
            </ View>
        );

    }
}

class QRScanner extends Component {

    setGroupCode = (data) => {
        this.props.setGroupCode(data);
    }
    getGroupCode = () => {
        return this.props.getGroupCode();
    }
    constructor(props){
        super(props);
        this.state = {
            showScanner: false,
        }
    }
    qrCodeScanned = ({ type, data }) => {
        console.log(data, " scanned")
        if( this.props.setGroupCode(data) ) {
            this.setState({
                showScanner: false,
            })
            this.props.navigation.navigate("Invite Page", {isDarkmode: this.props.isDarkmode});
        } else {
            alert('that code does not belong to a valid group');
        }

    };

    async askPermission() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

    }

    async getPermission() {
        const {status} = await Permissions.getAsync(Permissions.CAMERA);
        return status == 'granted';
    }
    showScanner = () => {
        if( this.state.showScanner && this.getPermission() ) {
            return(
                <View style = {{flex:1, width: '100%', height: '100%'}}>
                    <BarCodeScanner
                        onBarCodeScanned={this.qrCodeScanned}
                        style={[ StyleSheet.absoluteFillObject, styles.BarCodeScanner]}
                    />
                </View>

            )
        } else if ( !this.getPermission() ) {
            return(
                <TouchableWithoutFeedback onPress={this.askPermission}>
                    <View style={[styles.button, (this.props.isDarkmode?styles.buttonColor1Dark: styles.buttonColor1 )]}>
                        <Text style={[ (this.props.isDarkmode?styles.buttonColor1Dark: styles.buttonColor1 )]}>
                            We need your permission to use the camera
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            )

        } else {
            return(
                <TouchableWithoutFeedback onPress={()=>{this.setState({showScanner: true})}}>
                    <View style={[ styles.button, styles.buttonColor1Dark, { flex:1, width: '100%' } ]}>
                        <Text> Start Scanner </Text>
                    </View>
                </TouchableWithoutFeedback>
            )

        }
    }
    render() {
        var mode = (this.props.isDarkmode ? styles.darkmode: styles.lightmode);
        return(
            <View style = {[ styles.module ]}>
                <View style={[styles.moduleRow]}>
                    <View style={[styles.moduleCorner, {padding:1}]}>
                        <Image style = {styles.icon} source = {require('../assets/CameraIcon.png')}/>
                    </View>

                    <View style={styles.container}>
                        <Text style={[styles.guidance, {fontSize: 15}]}>Scan your friend's code from </Text>
                        <Text style={[styles.guidance, {fontSize: 15}]}> their device </Text>
                    </View>
                    <View style={[styles.moduleCorner, {padding:1}]}>

                    </View>
                </View>
                <View style={[styles.module,{flex: 1}]}>
                    <this.showScanner/>
                </View>

                <View style={[styles.moduleRow]}>

                </View>
            </View>
        );

    }
}
class GroupsAccommodationsPage extends Component {
    constructor(props) {
        super(props);
        const {isDarkmode = false} = this.props.route.params;
        var { mode } = (this.props.route.params.isDarkmode ? styles.darkmode: styles.lightmode);
        const { navigation } = this.props;
        this.firebaseRef = db.database().ref(this.props.route.params.getGroupCode());
        this.state = {
            showState: 1
        }
        //console.log("Groups( isDarkmode: " + isDarkmode + ")");
        //Alert.alert( "Group Accomodations render, State: " + this.state.showState);
    };

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    showEatingAlone = () => {
        if( this.state.showState != 1 ) {
            return null;
        }
        return (
            <View>
                <View style = {styles.padding}/>
                <EatingAlone isDarkmode={this.props.route.params.isDarkmode} navigation={this.props.navigation} />
            </View>

        );
    }
    showQRScanner = () => {
        if( this.state.showState != 2 ) {
            return null;
        }
        return (
            <View>
                <View style = {styles.padding}/>
                <QRScanner isDarkmode={this.props.route.params.isDarkmode} navigation={this.props.navigation} setGroupCode={this.props.route.params.setGroupCode} getGroupCode={this.props.route.params.getGroupCode}/>
            </View>

        );
    }
    showQRcode = () => {
        if( this.state.showState != 3 ) {
            return null;
        }
        return (
            <View>
                <View style = {styles.padding}/>
                <QRCode isDarkmode={this.props.route.params.isDarkmode} navigation={this.props.navigation} />
            </View>

        );
    }

    onJoinPressed = () => {
        console.log( "Join Pressed");
        if( this.state.showState == 2) {
            this.setState(prevState => ({
                showState: 1
              }));
        } else {
            this.setState(prevState => ({
                showState: 2
            }));
        }
        //Alert.alert( "Group Accomodations render, State: " + this.state.showState);
    }

    onInvitePressed = () => {

        this.firebaseRef.set({
            Members:1,
            Budget: {m:0, mm:0, mmm:0},
            Diet: {Lactose:0,Nut:0,Shellfish:0,Vegan:0,Vegetarian:0,Kosher:0,Paleo:0},
            Cuisine: {Chinese:0, American:0, Mexican:0, Italian:0, Japanese:0, 
                Korean:0, Thai:0, Vietnamese:0, Indian:0},
            Restaurant: {Breakfast:0, Brunch:0, Bar:0, FastFood:0, Dessert:0, 
                Drink:0, CoffeeShop:0, BBQ:0, Dinner:0}
        });

        // temporarily here so i dont get 1000000 instances in my db when u guys test
        this.firebaseRef.remove();

        this.props.navigation.navigate("Invite Page", {isDarkmode: this.props.route.params.isDarkmode});
        //Alert.alert( "Group Accomodations render, State: " + this.state.showState);
        this.setState(prevState => ({
            showState: 1
        }));
    }
    render( props ) {
        this.mode  = (this.props.route.params.isDarkmode ? styles.darkmode: styles.lightmode);
        console.log( this.props.isDarkmode + " : " + this.mode);
        console.log(this.state.showState);
        return(
            <View style = {[styles.container, this.mode]}>
                <View style = {[ this.mode, styles.padding ]} />
                <View style = {[styles.containerList, styles.lightmode, this.mode]}>
                    <Text style={[ styles.lightmode, this.mode, styles.text ]}>Are you eating with friends?</Text>
                    <View style = {styles.padding}/>
                    <TouchableWithoutFeedback  title = 'Join' onPress={this.onJoinPressed}>
                        <View
                            style = {[
                                this.mode, styles.buttonFocused,
                                (this.props.route.params.isDarkmode? styles.buttonColor2Dark: styles.buttonColor2 )
                            ]}
                        >
                            <Text
                                style = {[
                                    this.mode, styles.beginButtonText,
                                    (this.props.route.params.isDarkmode? styles.buttonColor2Dark: styles.buttonColor2 )
                                ]}
                            >
                                Join a Group
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <this.showQRScanner/>
                    <View style = {styles.padding}/>
                    <TouchableWithoutFeedback  title = 'Invite' onPress={this.onInvitePressed}>
                        <View style = {[
                            this.mode, styles.buttonFocused,
                            (this.props.route.params.isDarkmode? styles.buttonColor3Dark: styles.buttonColor3 )
                        ]}>
                            <Text style = {[
                                this.mode, styles.beginButtonText,
                                (this.props.route.params.isDarkmode? styles.buttonColor3Dark: styles.buttonColor3 )
                            ]}>
                                Invite to a Group
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <this.showQRcode />

                    <this.showEatingAlone/>
                </View>
                <View style = {[ this.mode, styles.padding, {flex: 0.7}]} />
                <Navbar isDarkmode={this.props.route.params.isDarkmode} navigation={this.props.navigation}/>
            </View>
        );

    }
  }
  export default GroupsAccommodationsPage;
