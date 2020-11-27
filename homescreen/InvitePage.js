import React, {useState} from 'react';
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, Switch, Alert } from 'react-native';

const { Component } = require("react");

import './LogoDark.png';
import './Logo.png'
import './Navbar';
import Navbar from './Navbar';
import styles from './styles' ;
import colors from './colors';
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
                        logo={(this.props.route.params.isDarkmode?require('./LogoDark.png'): require('./Logo.png'))}
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
                    <TouchableWithoutFeedback  title = 'Generate' onPress={()=>{this.props.navigation.navigate("Placeholder", {isDarkmode: isDarkmode})}}> 
                    <View style = {[ mode, styles.buttonFocused, (isDarkmode? styles.buttonColor2Dark: styles.buttonColor1)  ]}>
                        <Text style = {[mode, styles.beginButtonText,  (isDarkmode? styles.buttonColor2Dark: styles.buttonColor1) ]}> 
                            Generate recomendation 
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                
                </View>
                <Navbar isDarkmode={isDarkmode} />
            </View>
        )
        
    }
}

export default InvitePage;