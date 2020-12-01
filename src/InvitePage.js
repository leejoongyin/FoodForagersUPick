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
    getGroupCount() {
        return 4;
    }
    render() {
        var mode  = (this.props.route.params.isDarkmode ? styles.darkmode: styles.lightmode);
        var isDarkmode = this.props.route.params.isDarkmode
        return (
            <View style={[ styles.container, mode ]}>
                <View style={[ styles.mainViewer, mode ]}>
                    <Text style={[mode, {fontSize: 20, color: 'black'}]}> Session </Text>
                    <Text style={[mode, {color: 'black', fontSize: 50, fontWeight: 'bold', letterSpacing: 10}]}>
                        {this.props.route.params.getGroupCode()}
                    </Text>
                    <View style={[styles.padding]}/>
                    <View style={[styles.padding]}/>
                    <QRCode
                        value ={this.props.route.params.getGroupCode()}
                        logo={(this.props.route.params.isDarkmode?require('../assets/LogoDark.png'): require('../assets/Logo.png'))}
                        logoBackgroundColor={isDarkmode?colors.darkBG:colors.liteBG}
                        backgroundColor={isDarkmode?colors.darkBG:colors.liteBG}
                        logoSize={50}
                        size={200}
                    />
                    <Text> </Text>
                    <View styles={[styles.padding]}/>
                    <View styles={[styles.padding]}/>
                    <Text> </Text>
                    <View styles={[styles.padding]}/>
                    <Text style={[mode, {color: 'black', fontSize: 20 }]}> Total Group Members: </Text>
                    <Text style={[mode, {color: 'black', fontSize: 50, fontWeight: 'bold'}]}>
                        {this.getGroupCount()}
                    </Text>
                    <View style={[styles.padding]}/>
                    <View style={[styles.padding]}/>
                    <TouchableWithoutFeedback  title = 'Generate' onPress={()=>{this.props.navigation.navigate("Restaurant Info", {isDarkmode: isDarkmode})}}>
                        <View style = {[ mode, styles.buttonFocused, (isDarkmode? styles.buttonColor2Dark: styles.buttonColor1)  ]}>
                            <Text style = {[mode, styles.beginButtonText,  (isDarkmode? styles.buttonColor2Dark: styles.buttonColor1) ]}>
                                Generate recomendation
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{height: '15%', flex: -1}}/>
                </View>
                <Navbar isDarkmode={this.props.route.params.isDarkmode} navigation={this.props.navigation}/>
            </View>
        )

    }
}

export default InvitePage;
