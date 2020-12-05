
import React, {Component} from 'react';
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, TextInput, Switch, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';

import '../assets/CameraIcon.png'
import styles, {INNER_MODULE_WIDTH, MODULE_FRAME, MODULE_WIDTH} from '../style/styles';
import db from './base';

class EatingAlone extends Component {
    constructor(props){
        super(props);
        const {navigation, isDarkmode}= this.props;
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
                            this.props.navigation.navigate(
                                "Restaurant Info",
                                {isDarkmode: this.props.isDarkmode}
                            )
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
            groupCode: '',
            hasCameraPermission: null,
        }
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
    groupCodeEntered = (groupCode) => {
        if( this.props.setGroupCode( groupCode ) ) {
            this.setState({
                showScanner: false,
                isVerifying: false,
                inputtingText: false,

            })
            this.props.navigation.navigate("Invite Page", {isDarkmode: this.props.isDarkmode});
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
                <TouchableWithoutFeedback onPress={()=>{this.setState({inputtingText: false})}}>
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
                            placeholder=" Or enter Group Code here"
                            onChangeText={(groupCodeIn)=>{this.groupCodeEntered(groupCodeIn)}}
                            underlineColorAndroid="transparent"
                            onFocus={()=>{this.setState({inputtingText: true})}}
                            onEndEditing={()=>{this.setState({inputtingText: false})}}
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
