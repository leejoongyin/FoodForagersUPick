import React, {useState} from 'react';
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, Switch, Alert } from 'react-native';

const { Component } = require("react");

import './LogoNew.png';
import './Navbar';
import Navbar from './Navbar';
import styles from './styles' ;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkmode: this.props.route.params.isDarkmode
    }
    var mode = ( this.props.route.params.getIsDarkmode()? styles.darkmode : styles.lightmode );
    const{ isDarkmode, getIsDarkmode, toggleDarkmode} = this.props.route.params;
    //this.toggleDarkmode = this.toggleDarkmode.bind(this);
    console.log("HomePage rendered: " + this.props.route.params.getIsDarkmode() + ": " + mode.color ); 
  }

  onBeginPressed = () => {
    //Alert.alert("Begin Pressed","Navigate to 'preferences'");  
    //this.props.navigation.setOptions({ headerTintColor: 'white' });
    this.props.navigation.navigate('Group Accomadations', {isDarkmode: this.props.route.params.getIsDarkmode()});
  }

  
  
  toggleDarkmode = () => {
    this.props.route.params.toggleDarkmode();
    this.setState(prevState => ({
      isDarkmode: this.props.route.params.getIsDarkmode()
    }));
  };

  render(){
    this.mode = ( this.props.route.params.getIsDarkmode()? styles.darkmode : styles.lightmode );

    //mode = ( this.props.route.params.getIsDarkmode()? styles.darkmode : styles.lightmode );
    //console.log("HomePage rendered: " + this.props.route.params.getIsDarkmode()); 
    return (
      <View style = {styles.container}>
        <View style = {[ this.mode, styles.statusBar]} />
        <View style = {[ this.mode, styles.darkmodeToggleContainer ]}> 
          <View style = {{flex:1}}/>
          <Text style = {[ this.mode, {fontSize: 12} ]}> DARK MODE </Text>
          <Switch 
            value={this.props.route.params.getIsDarkmode()} 
            onValueChange={this.toggleDarkmode} 
            trackColor={{ false: "#999999", true: accentColorSec }}
            thumbColor={this.props.route.params.getIsDarkmode() ? accentColorPrim : "#f4f3f4"}
          />
          <View style = {{width: 2}} />
        </View> 
        <View style = {[ this.mode, styles.mainViewer ]}>
          <View style = {{flex: 0.5}}/>
            <Text style = {[{ fontSize: 20 }, this.mode ]}> WELCOME TO </Text>
            <Text style = {[ styles.title, this.mode ]}> UPick </Text>
            <View style = {styles.padding}/>
            <Image style = {styles.logo} source = {require('./LogoNew.png')}/>
            <View style = {styles.padding}/>
            <Text style = {[{ fontSize: 20, fontStyle: 'italic'}, this.mode ]}> Let us help you decide where </Text>
            <Text style = {[{ fontSize: 20, fontStyle: 'italic'}, this.mode ]}> or what to eat </Text>
            <View style = {styles.padding}/>
            <TouchableWithoutFeedback  title = 'BEGIN' onPress = {this.onBeginPressed}> 
              <View style = {[ this.mode, styles.buttonFocused ]}><Text style = {[this.mode, styles.beginButtonText]}> BEGIN </Text></View>
            </TouchableWithoutFeedback>
          <View style = {{flex: 1}}/>
        </View>
        <Navbar mode={this.mode} />
      </View>
      
    );
  }
    
  
}

const accentColorPrim = '#992929';
const accentColorSec = '#441111';

export default HomePage;

/* 
constructor 
  render () {
    return{
      <View>
        are you eating with a friend
        button
        function(state = 2 return qrcode component else return null)
        button
        function returns 
      </>
    }
  }
*/