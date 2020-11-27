import React, {useState} from 'react';
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, Switch, Alert } from 'react-native';

const { Component } = require("react");

import styles from '../style/home_style';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkmode: this.props.route.params.isDarkmode
    }
    var mode = ( this.props.route.params.getIsDarkmode()? styles.darkmode : styles.lightmode );
    const{ isDarkmode, getIsDarkmode, toggleDarkmode} = this.props.route.params;
  }

  onBeginPressed = () => {
    this.props.navigation.navigate('RecipeSearch', {isDarkmode: this.props.route.params.getIsDarkmode()});
  }



  toggleDarkmode = () => {
    this.props.route.params.toggleDarkmode();
    this.setState(prevState => ({
      isDarkmode: this.props.route.params.getIsDarkmode()
    }));
  };

  render(){
    this.mode = ( this.props.route.params.getIsDarkmode()? styles.darkmode : styles.lightmode );

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
            <View style = {styles.padding}/>
            <Text style = {[{ fontSize: 20, fontStyle: 'italic'}, this.mode ]}> Let us help you decide where </Text>
            <Text style = {[{ fontSize: 20, fontStyle: 'italic'}, this.mode ]}> or what to eat </Text>
            <View style = {styles.padding}/>
            <TouchableWithoutFeedback  title = 'Search a Recipe' onPress = {this.onBeginPressed}>
              <View style = {[ this.mode, styles.buttonFocused ]}><Text style = {[this.mode, styles.beginButtonText]}> BEGIN </Text></View>
            </TouchableWithoutFeedback>
          <View style = {{flex: 1}}/>
        </View>
      </View>

    );
  }


}

const accentColorPrim = '#992929';
const accentColorSec = '#441111';

export default Home;
