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
      <View style = {[styles.container,this.mode]}>
        <View style = {[ this.mode, styles.statusBar]} />
        <View style = {[ this.mode, styles.darkmodeToggleContainer ]}>
          <View style = {{flex:1}}/>
          <Text style = {[ this.mode, {fontSize: 12} ]}> DARK MODE </Text>
          <Switch
            value={this.props.route.params.getIsDarkmode()}
            onValueChange={this.toggleDarkmode}
            trackColor={{ false: "white", true: '#A6433F' }}
            thumbColor={'white'}
          />
          <View style = {{width: 5}} />
        </View>
        <View style = {[ this.mode, styles.mainViewer ]}>
          <View style = {{flex: 0.15}}/>
          <Text
            style = {[ this.mode, { fontSize: 20, color: (isDarkmode?colors.accentTerDark :colors.accentTer ) }]}
          >
            WELCOME TO
          </Text>
          <Text style = {[ styles.title, this.mode ]}> UPick </Text>
          <View style = {styles.padding}/>
          <Image
            style = {styles.logo}
            source = {(isDarkmode?require('../assets/LogoDark.png'): require('../assets/Logo.png'))}
          />
          <View style = {styles.padding}/>
          <View style = {{flex: 0.2}}/>
          <Text style = {[ styles.guidance, this.mode ]}> Let us help you decide where </Text>
          <Text style = {[ styles.guidance, this.mode ]}> or what to eat </Text>
          <View style = {styles.paddingLine}/>
          <TouchableWithoutFeedback  title = 'BEGIN' onPress = {this.onBeginPressed}>
            <View style = {[ this.mode, styles.buttonFocused, (isDarkmode? styles.buttonColor1Dark: styles.buttonColor1), {width:0.7*SCALING_WIDTH} ]}>
              <Text style = {[this.mode, styles.buttonText, (isDarkmode? styles.buttonColor1Dark: styles.buttonColor1)]}> BEGIN </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style = {[styles.paddingBottom]}/>
        </View>
      </View>

    );
  }
}

export default HomePage;
