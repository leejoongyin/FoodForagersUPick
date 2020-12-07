import React, {useState} from 'react';
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, Switch, Alert } from 'react-native';

const { Component } = require("react");

import '../assets/LogoDark.png';
import '../assets/Logo.png'
import './Navbar';
import Navbar from './Navbar';
import styles from '../style/styles' ;
import colors from '../style/colors';
import QRCode from 'react-native-qrcode-svg';

class InvitePage extends Component {
    render() {
        var isDarkmode = this.props.route.params.isDarkmode
        var mode  = (isDarkmode ? styles.darkmode: styles.lightmode);
        var mode2  = (isDarkmode ? styles.darkmode2: styles.lightmode2);
        return (
            <View style={[ styles.container, mode ]}>
                <View style={[ styles.mainViewer, mode ]}>
                    <View style={[styles.padding]}/>

                    <Text style={[ mode2, { fontSize: 20 } ]}> Group Code: </Text>
                    <Text style={[ mode, { fontSize: 50, fontWeight: 'bold', letterSpacing: 10 }]}>
                        {this.props.route.params.getGroupCode()}
                    </Text>

                    <View style={[styles.padding]}/>

                    <View style={[{height: 200, width: 200}]}>
                        <QRCode
                            value ={this.props.route.params.getGroupCode()}
                            logo={(this.props.route.params.isDarkmode?require('../assets/LogoDark.png'): require('../assets/Logo.png'))}
                            logoBackgroundColor={isDarkmode?colors.darkBG:colors.liteBG}
                            backgroundColor={isDarkmode?colors.darkBG:colors.liteBG}
                            logoSize={50}
                            size={200}
                        />
                    </View>

                    <Text> </Text>
                    <View styles={[styles.padding]}/>
                    <View style={[styles.padding]}/>

                    <TouchableWithoutFeedback  title = 'Generate' onPress={()=>{this.props.navigation.navigate("Restaurant Info", {isDarkmode: isDarkmode})}}>
                        <View style = {[ mode, styles.buttonFocused, (isDarkmode? styles.buttonColor2Dark: styles.buttonColor1)  ]}>
                            <Text style = {[mode, styles.buttonText,  (isDarkmode? styles.buttonColor2Dark: styles.buttonColor1) ]}>
                                Generate recomendation
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={[styles.padding]}/>

                    <TouchableWithoutFeedback  title = 'Generate' onPress={()=>{this.props.navigation.navigate("Restaurant From List", {isDarkmode: isDarkmode, restaurantList: this.props.route.params.getRestaurantList() })}}>
                        <View style = {[ mode, styles.buttonFocused, (isDarkmode? styles.buttonColor2Dark: styles.buttonColor1)  ]}>
                            <Text style = {[mode, styles.buttonText,  (isDarkmode? styles.buttonColor2Dark: styles.buttonColor1) ]}>
                                Generate recomendation from Restaurant List
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={styles.paddingBottom}/>
                </View>
            </View>
        )

    }
}

export default InvitePage;
