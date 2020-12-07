
import React, {Component} from 'react';
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, TextInput, Switch, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner, Constants } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

import '../assets/CameraIcon.png'
import styles, {INNER_MODULE_WIDTH, MODULE_FRAME, MODULE_WIDTH} from '../style/styles';
import db from './base';
import {GROUP_CODE_LENGTH, GROUP_CODE_VALID_CHARS} from './constants';
import { filterGroupCodeInput } from './filterInput';

import KEYS from "./config/keys.json";
import axios from 'axios';

const apiKey = KEYS.yelp.api_key;
class EatingAlone extends Component {
    constructor(props){
        super(props);
        const {navigation, isDarkmode}= this.props;
        this.isDarkmode = this.props.isDarkmode;
        this.getStoredData();
    }
    getStoredData = async () => {
      this.getData('zipcode').then((result) => {
          this.setState({zipcode: result});
          console.log('zipcode: ', this.state.zipcode);
      });
      this.getData('time').then((result) => {
          this.setState({time: parseInt(new Date(result).getTime() / 1000)});
          console.log('time: ', this.state.time);
      });
      this.getData('budget').then((result) => {
          this.setState({budgetArray: result });
          console.log('budget: ', this.state.budgetArray);
      });
      this.getData('diet').then((result) => {
          this.setState({dietArray: result});
          console.log('diet: ', this.state.dietArray);
      });
     this.getData('cuisine').then((result) => {
          this.setState({cuisineArray: result});
          console.log('cuisine: ', this.state.cuisineArray);
      });
      this.getData('restaurant').then((result) => {
          this.setState({restaurantArray: result});
          console.log('restauarnt: ', this.state.restaurantArray);
      });
  }
  getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key).then((key) => {return key;})
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
      // read error
      alert('error: ', e);
    }
    console.log('Done.')
  }

  getRestaurantFromYelp = async () => {
    let categories = this.state.dietArray.concat(this.state.cuisineArray).concat(this.state.restaurantArray);
    console.log(categories);
    await axios.get(`https://api.yelp.com/v3/businesses/search`, {
      headers: {'Authorization': `Bearer ${apiKey}`},
      params: {
          limit: 1,
          categories: 'mexican',
          open_at: this.state.time,
          location: this.state.zipcode
      }
    }).then((response) => {
      console.log(response.data.businesses[0].name);
      this.storeData('restaurant_name', response.data.businesses[0].name);
      this.storeData('image', response.data.businesses[0].image_url);
      this.storeData('location', response.data.businesses[0].location.display_address);
      this.storeData('phone', response.data.businesses[0].display_phone);
      this.storeData('url', response.data.businesses[0].url);
    });
  }

  storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key,jsonValue)
    } catch (e) {
      // saving error
      alert('error: ', e);
    }
  }
    render(props) {
        var mode = (this.props.isDarkmode ? styles.darkmode : styles.lightmode);
        var buttonColor1 = (this.props.isDarkmode ? styles.buttonColor2Dark : styles.buttonColor1);
        return(
            <View style={styles.outline, styles.containerModule}>
                <View style = {styles.paddingManual}/>

                <View style = {styles.paddingManual}/>
                <Text style = {[mode, styles.text]} >
                    or get a recommendation just for you:
                </Text>
                <View style = {styles.paddingManual}/>
                <TouchableWithoutFeedback
                    title = 'Generate'
                    onPress={
                        ()=>{
                          this.getRestaurantFromYelp().then(() => {
                            this.props.navigation.navigate(
                                "Restaurant Info",
                                {isDarkmode: this.props.isDarkmode}
                            );
                          });

                        }
                    }
                >
                    <View style = {[ styles.buttonFocused, buttonColor1, {height: 75} ]}>
                        <Text style = {[ styles.buttonText, buttonColor1 ]}>
                            Generate restaurant
                        </Text>
                        <Text style = {[ styles.buttonText, buttonColor1 ]}>
                            recommendation
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
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

        this._isMounted = false;
        this.state = {
            showScanner: false,
            isVerifying: false,
            groupCodeIn: '',
            hasCameraPermission: null,
        }

        this.getData('zipcode').then((result) => {
            this.setState({zipcode: result});
            console.log('zipcode: ', this.state.zipcode);
        });
        this.getData('time').then((result) => {
            this.setState({time: result});
            console.log('time: ', this.state.time);
        });
        this.getData('budget').then((result) => {
            this.setState({budgetArray: result });
            console.log('budget: ', this.state.budgetArray);
        });
        this.getData('diet').then((result) => {
            this.setState({dietArray: result});
            console.log('diet: ', this.state.dietArray);
        });
        this.getData('cuisine').then((result) => {
            this.setState({cuisineArray: result});
            console.log('cuisine: ', this.state.cuisineArray);
        });
        this.getData('restaurant').then((result) => {
            this.setState({restaurantArray: result});
            console.log('restauarnt: ', this.state.restaurantArray);
        });
    }

    getData = async (key) => {
        try {
          const jsonValue = await AsyncStorage.getItem(key).then((key) => {return key;})
          return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch(e) {
          // read error
          alert('error: ', e);
        }
        console.log('Done.')
    }

    qrCodeScanned = ({ type, data }) => {
        if( this.state.isVerifying ) {
            return;
        } else {

        }
        //console.log(data, " scanned")
        if( this.props.setGroupCode(data) ) {
            this.setState({
                showScanner: false,
            })
            this.props.navigation.navigate("Invite Page", {isDarkmode: this.props.isDarkmode});
        } else {
            this.setState({
                isVerifying: true,
            });
            Alert.alert(
                'Invalid Code Scanned',
                "The code that was scanned is not a group code",
                [{text: "ok", onPress: ()=>{this.codeWarningDismissed()}}]
            );
        }

    };

    updateDB(filteredInput) {
        this.firebaseRef = db.database().ref(filteredInput);
        var timelocation = {};
        timelocation['Zipcode'] = this.state.zipcode;
        timelocation['Time'] = this.state.time;
        this.firebaseRef.update(timelocation);

        this.firebaseRef.child('Budget').once('value').then((snapshot) => {
            var updates = {};
            var temp = 0;

            if (snapshot.exists()) {
                for (let budget of this.state.budgetArray) {
                    if (budget === '$') {
                        temp = 0;
                        if (snapshot.child('Small').val()) {
                            temp = parseInt(snapshot.child('Small').val());
                        }
                        updates['/Budget/Small/'] = temp + 1;
                    }
                    if (budget === '$$') {
                        temp = 0;
                        if (snapshot.child('Medium').val()) {
                            temp = parseInt(snapshot.child('Medium').val());
                        }
                        updates['/Budget/Medium/'] = temp + 1;
                    }
                    if (budget === '$$$') {
                        temp = 0;
                        if (snapshot.child('Large').val()) {
                            temp = parseInt(snapshot.child('Large').val());
                        }
                        updates['/Budget/Large/'] = temp + 1;
                    }
                }
                this.firebaseRef.update(updates);
            }
        });
        this.firebaseRef.child('Diet').once('value').then((snapshot) => {
            var updates = {};
            var temp = 0;
            if (snapshot.exists()) {
                for (let diet of this.state.dietArray) {
                    temp = 0;
                    if (snapshot.child(diet).val()) {
                        temp = parseInt(snapshot.child(diet).val());
                    }
                    updates['/Diet/' + diet] = temp + 1;
                }
                this.firebaseRef.update(updates);
            }
        });
        this.firebaseRef.child('Cuisine').once('value').then((snapshot) => {
            var updates = {};
            var temp = 0;
            if (snapshot.exists()) {
                for (let cuisine of this.state.cuisineArray) {
                    temp = 0;
                    if (snapshot.child(cuisine).val()) {
                        temp = parseInt(snapshot.child(cuisine).val());
                    }
                    updates['/Cuisine/' + cuisine] = temp + 1;
                }
                this.firebaseRef.update(updates);
            }
        });
        this.firebaseRef.child('Restaurant').once('value').then((snapshot) => {
            var updates = {};
            var temp = 0;
            if (snapshot.exists()) {
                for (let restaurant of this.state.restaurantArray) {
                    temp = 0;
                    if (snapshot.child(restaurant).val()) {
                        temp = parseInt(snapshot.child(restaurant).val());
                    }
                    updates['/Restaurant/' + restaurant] = temp + 1;
                }
                this.firebaseRef.update(updates);
            }
        });
        this.firebaseRef.off();
    }

    groupCodeEntered = (input) => {
        var filteredInput = filterGroupCodeInput(input);
        this.setState({
            groupCodeIn: filteredInput
        });
        if( this.props.setGroupCode( filteredInput ) ) {
            this.setState({
                showScanner: false,
                isVerifying: false,
                inputtingText: false,
                groupCodeIn: ""

            })
            this.updateDB(filteredInput);
            this.props.navigation.navigate("Invite Page", {isDarkmode: this.props.isDarkmode});
        } else if ( filteredInput.length >= GROUP_CODE_LENGTH ) {
            Alert.alert(" The code entered: (" + filteredInput + ") is not a valid group code");
            this.setState({
                groupCodeIn: ""
            });
        }
    }

    codeWarningDismissed = () => {
        this.setState({
            isVerifying: false,
        });
    }

    onShowPressed = () => {
        this.setState({
            showScanner: true,
        });
    }
    onScannerHeaderPressed = () => {
        if( this.state.inputtingText ) {
            this.setState({inputtingText: false});
        } else {
            this.setState({showScanner: false});
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.getPermission();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async askPermission() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        if( this._isMounted ) {
            this.setState({
                hasCameraPermission: status === 'granted'
            });
        }

        //console.log(this.state.hasCameraPermission);

    }

    async getPermission() {
        const {status, granted} = await Permissions.getAsync(Permissions.CAMERA);
        //console.log("Camera Permission: " + status + ": " + granted );
        if( this._isMounted ) {
            this.setState({
                hasCameraPermission: status === 'granted'
            });
        }
        return status === 'granted';
    }
    showScanner = () => {
        if( this.state.inputtingText) {
            return null;
        }
        this.getPermission();
        if( !this.state.showScanner ) {
            return(
                <TouchableWithoutFeedback onPress={this.onShowPressed}>
                    <View style={[ styles.button, styles.buttonColor1Dark, { flex:1, width: '90%' } ]}>
                        <Text style={[styles.buttonText, styles.buttonColor1Dark]}> Start Scanner </Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        } else if ( !this.state.hasCameraPermission ) {
            return(
                <TouchableWithoutFeedback onPress={ this.askPermission.bind(this) }>
                    <View
                        style={[
                            styles.button,
                            (this.props.isDarkmode?styles.buttonColor1Dark: styles.buttonColor1 ),
                            { flex:1, width: '90%' }
                        ]}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                (this.props.isDarkmode?styles.buttonColor1Dark: styles.buttonColor1)
                            ]}
                        >
                            We need your permission to use the camera
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            )

        } else {
            //console.log("Camera is shown");
            return(
                <View style = {styles.scannerContainer}>
                    <Camera
                        //type={Camera.Constants.Type.back}
                        style={[ styles.barCodeScanner ]}
                        onBarCodeScanned={this.qrCodeScanned}
                        barCodeScannerSettings={{
                            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                        }}
                        useCamera2Api={true}
                        onMountError={(message)=>{Alert.alert("Camera error", JSON.stringify(message) + this.getPermission())}}
                        //ratio={"1:1"}
                    />
                </View>

            )

        }
    }
    render() {
        var mode = (this.props.isDarkmode ? styles.darkmode: styles.lightmode);
        return(
            <View style = {[ styles.module, {height: (this.state.inputtingText?2*MODULE_FRAME:MODULE_WIDTH)} ]}>
                <TouchableWithoutFeedback onPress={this.onScannerHeaderPressed.bind(this)}>
                    <View style={[styles.moduleRow]}>
                        <View style={[styles.moduleCorner, {padding:1}]}>
                            <Image style = {styles.icon} source = {require('../assets/CameraIcon.png')}/>
                        </View>

                        <View style={styles.container}>
                            <Text style={[styles.guidance, {fontSize: 15}]}>Scan your friend's code from</Text>
                            <Text style={[styles.guidance, {fontSize: 15}]}>their device</Text>
                        </View>
                        <View style={[styles.moduleCorner, {padding:1}]}>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={[styles.container, {flex: 1, width: MODULE_WIDTH}]}>
                    <this.showScanner/>
                </View>

                <View style={[styles.moduleRow]}>
                    <View style={[styles.paddedView]}>
                        <TextInput
                            style={[styles.inputBox, styles.outline]}
                            value={this.state.groupCodeIn}
                            keyboardType='visible-password'
                            placeholder=" Or enter Group Code here"
                            onChangeText={(groupCodeIn)=>{this.groupCodeEntered(groupCodeIn)}}
                            underlineColorAndroid="transparent"
                            onFocus={()=>{this.setState({inputtingText: true})}}
                            onEndEditing={()=>{this.setState({inputtingText: false})}}
                            maxLength={4}
                        />
                    </View>
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
        this.state = {
            showState: 1
        }

        this.getData('zipcode').then((result) => {
            this.setState({zipcode: result});
            console.log('zipcode: ', this.state.zipcode);
        });
        this.getData('time').then((result) => {
            this.setState({time: result});
            console.log('time: ', this.state.time);
        });
        this.getData('budget').then((result) => {
            this.setState({budgetArray: result });
            console.log('budget: ', this.state.budgetArray);
        });
        this.getData('diet').then((result) => {
            this.setState({dietArray: result});
            console.log('diet: ', this.state.dietArray);
        });
        this.getData('cuisine').then((result) => {
            this.setState({cuisineArray: result});
            console.log('cuisine: ', this.state.cuisineArray);
        });
        this.getData('restaurant').then((result) => {
            this.setState({restaurantArray: result});
            console.log('restauarnt: ', this.state.restaurantArray);
        });
    };

    getData = async (key) => {
        try {
          const jsonValue = await AsyncStorage.getItem(key).then((key) => {return key;})
          return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch(e) {
          // read error
          alert('error: ', e);
        }
        console.log('Done.')
    }
    showEatingAlone = () => {
        if( this.state.showState != 1 ) {
            return null;
        }
        return (
            <View>
                <View style = {styles.paddingManual}/>
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
                <View style = {styles.paddingManual}/>
                <QRScanner isDarkmode={this.props.route.params.isDarkmode} navigation={this.props.navigation} setGroupCode={this.props.route.params.setGroupCode} getGroupCode={this.props.route.params.getGroupCode}/>
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
        this.props.route.params.setCode();
        this.firebaseRef = db.database().ref(this.props.route.params.getGroupCode());
        var updates = {};

        updates['Zipcode'] = this.state.zipcode;
        updates['Time'] = this.state.time;

        for (let budget of this.state.budgetArray) {
            if (budget === '$') {updates['/Budget/Small/'] = 1;}
            if (budget === '$$') {updates['/Budget/Medium/'] = 1;}
            if (budget === '$$$') {updates['/Budget/Large/'] = 1;}
        }

        for (let diet of this.state.dietArray) {
            updates['/Diet/' + diet] = 1;
        }

        for (let cuisine of this.state.cuisineArray) {
            updates['/Cuisine/' + cuisine] = 1;
        }

        for (let restaurant of this.state.restaurantArray) {
            updates['/Restaurant/' + restaurant] = 1;
        }

        this.firebaseRef.update(updates);
        // remove for testing VVV
        this.firebaseRef.remove();
        this.firebaseRef.off();

        this.props.navigation.navigate("Invite Page", {isDarkmode: this.props.route.params.isDarkmode});
        //Alert.alert( "Group Accomodations render, State: " + this.state.showState);
        this.setState(prevState => ({
            showState: 1
        }));
    }
    render( props ) {
        this.mode  = (this.props.route.params.isDarkmode ? styles.darkmode: styles.lightmode);
        //console.log( this.props.isDarkmode + " : " + this.mode);
        //console.log(this.state.showState);
        return(
            <View style = {[styles.container, this.mode]}>
                <View style = {[ this.mode, styles.paddingManual ]} />
                <View style = {[styles.containerList, styles.lightmode, this.mode]}>
                    <Text style={[ styles.lightmode, this.mode, styles.text ]}>Are you eating with friends?</Text>
                    <View style = {styles.paddingManual}/>
                    <TouchableWithoutFeedback  title = 'Join' onPress={this.onJoinPressed}>
                        <View
                            style = {[
                                this.mode, styles.buttonFocused,
                                (this.props.route.params.isDarkmode? styles.buttonColor2Dark: styles.buttonColor2 )
                            ]}
                        >
                            <Text
                                style = {[
                                    this.mode, styles.buttonText,
                                    (this.props.route.params.isDarkmode? styles.buttonColor2Dark: styles.buttonColor2 )
                                ]}
                            >
                                Join a Group
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <this.showQRScanner/>

                    <View style = {styles.paddingManual}/>

                    <TouchableWithoutFeedback  title = 'Invite' onPress={this.onInvitePressed}>
                        <View style = {[
                            this.mode, styles.buttonFocused,
                            (this.props.route.params.isDarkmode? styles.buttonColor3Dark: styles.buttonColor3 )
                        ]}>
                            <Text style = {[
                                this.mode, styles.buttonText,
                                (this.props.route.params.isDarkmode? styles.buttonColor3Dark: styles.buttonColor3 )
                            ]}>
                                Invite to a Group
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <this.showEatingAlone/>

                    <View style={styles.paddingBottom}/>
                </View>
            </View>
        );

    }
  }
  export default GroupsAccommodationsPage;
