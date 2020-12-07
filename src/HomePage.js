import React, {useState} from 'react';
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, Switch, Alert } from 'react-native';

const { Component } = require("react");

import '../assets/LogoDark.png';
import '../assets/Logo.png'
import styles, {SCALING_WIDTH} from '../style/styles' ;
import colors from '../style/colors';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkmode: this.props.route.params.isDarkmode
    }
    var mode = ( this.props.route.params.getIsDarkmode()? styles.darkmode : styles.lightmode );
    //this.toggleDarkmode = this.toggleDarkmode.bind(this);
    console.log("HomePage rendered: " + this.props.route.params.getIsDarkmode() + ": " + mode.color );
  }

  onBeginPressed = () => {
    this.props.navigation.navigate('Generate', {isDarkmode: this.props.route.params.getIsDarkmode()});
  }

  toggleDarkmode = () => {
    this.props.route.params.toggleDarkmode();
    this.setState(prevState => ({
      isDarkmode: this.props.route.params.getIsDarkmode()
    }));
  };

  static navigationOptions = {
    headerShown: 'false',
  };

  render(){
    var isDarkmode = this.props.route.params.getIsDarkmode()
    this.mode = ( isDarkmode? styles.darkmode : styles.lightmode );
    //mode = ( this.props.route.params.getIsDarkmode()? styles.darkmode : styles.lightmode );
    //console.log("HomePage rendered: " + this.props.route.params.getIsDarkmode());
    return (
      <View style = {[styles.homeContainer, this.mode]}>
        <View style = {styles.homePadding} />
        <View style = {[ this.mode, styles.darkmodeToggleContainer ]}>
          {/* <View style = {{flex:1}}/> */}
          <Text style = {[ this.mode, {fontSize: 12} ]}> DARK MODE </Text>
          <Switch
            value={this.props.route.params.getIsDarkmode()}
            onValueChange={this.toggleDarkmode}
            trackColor={{ false: "white", true: '#A6433F' }}
            thumbColor={'white'}
          />
        </View>
        <View style = {[ this.mode, styles.homeContentContainer ]}>
          <Text
            style = {[ this.mode, { fontSize: 20, color: (isDarkmode?colors.accentTerDark :colors.accentTer ) }]}
          >
            WELCOME TO
          </Text>
          <Text style = {[ styles.title, this.mode ]}> UPick </Text>
          <Image
            style = {styles.logo}
            source = {(isDarkmode?require('../assets/LogoDark.png'): require('../assets/Logo.png'))}
          />
          <View style = {styles.homeGuidanceContainer}>
            <Text style = {[ styles.homeGuidance, this.mode ]}> Let us help you decide where </Text>
            <Text style = {[ styles.homeGuidance, this.mode ]}> or what to eat </Text>
          </View>
          <TouchableWithoutFeedback  title = 'BEGIN' onPress = {this.onBeginPressed}>
            <View style = {[ this.mode, styles.buttonFocused, (isDarkmode? styles.buttonColor1Dark: styles.buttonColor1), {width:0.7*SCALING_WIDTH} ]}>
              <Text style = {[this.mode, styles.buttonText, (isDarkmode? styles.buttonColor1Dark: styles.buttonColor1)]}> BEGIN </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

    );
  }
}

export default HomePage;
