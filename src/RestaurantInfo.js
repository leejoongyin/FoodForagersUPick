import React from 'react';
import { Image, Text, View, TouchableWithoutFeedback } from 'react-native';
import styles from '../style/styles';

import '../assets/McDonalds.png'//logo from './assets/mcds.jpg'
// import { StatusBar } from 'expo-status-bar';
// import colors from '../style/colors';
// import {SCALING_WIDTH, MODULE_WIDTH, MODULE_RADIUS} from '../style/styles';
// const restaurauntImage = '../assets/splash.png';

export default function App(props) {
  var isDarkmode = props.route.params.isDarkmode;
  var mode = (isDarkmode?styles.darkmode:styles.lightmode);
  var mode2 = (isDarkmode?styles.darkmode2:styles.lightmode2);
  var buttonColor = (isDarkmode?styles.buttonColor1Dark:styles.buttonColor1);

  return (
  <View style = {[styles.resInfoScreen]}>
    <View style={[ styles.mainViewer, mode ]}>
      <View style={[styles.resInfoPadding]}/>
      <Text style={[ mode2, { fontSize: 25 }]}>Let's go to:</Text>
      <Text style={[ mode, { fontSize: 45, fontWeight: 'bold'} ]}>McDonald's</Text>
      <View style={[styles.resInfoPadding]}/>
      <Image
        source={require('../assets/McDonalds.png')}
        style={[styles.resInfoRestaurauntImage]}
      />
      <View style={[styles.resInfoPadding]}/>
      <View style={[styles.resInfoRow]}>
        <Text style={[styles.resInfoTextStyle, mode2, {fontWeight: "bold"}]}>Hours: </Text>
        <Text style={[styles.resInfoTextStyle, mode2, {fontWeight: "bold", fontStyle: 'italic'}]}>Open Now </Text>
        <Text style={[styles.resInfoTextStyle, mode2]}> until 7pm </Text>
      </View>
      <View style={[styles.resInfoPaddingline]}/>
      <View style={[styles.resInfoRow]}>
        <Text style={[styles.resInfoTextStyle, mode2, {fontWeight: "bold"}]}>Location: </Text>
        <Text style={[styles.resInfoTextStyle, mode2 ]}>1234 Street Ave. City, ST 91234</Text>
      </View>
      <View style={[styles.resInfoPaddingline]}/>
      <View style={[styles.resInfoRow]}>
        <Text style={[styles.resInfoTextStyle, mode2, {fontWeight: "bold"}]}>Phone Number: </Text>
        <Text style={[styles.resInfoTextStyle, mode2 ]}>123-123-1234</Text>
      </View>

      <View style={[styles.resInfoPaddingline]}/>
      <View style={[styles.resInfoPaddingline]}/>
      <View style={[styles.resInfoPaddingline]}/>
      <View style={[styles.resInfoPaddingline]}/>

      <View style={[styles.resInfoRow]}>
          <TouchableWithoutFeedback
            onPress={() => alert('Menu!')}
            style={[styles.resInfoButton]}
          >
            <View style = {[ mode, styles.resInfoButton, buttonColor ]}>
              <Text style={[styles.buttonText, buttonColor]}>View Menu</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={[styles.resInfoButtonGap]}/>
          <TouchableWithoutFeedback
            onPress={() => alert('Call!')}
            style={[styles.resInfoButton]}
          >
            <View style = {[ mode, styles.resInfoButton, buttonColor ]}>
              <Text style={[styles.buttonText, buttonColor]}>Call Now</Text>
            </View>
          </TouchableWithoutFeedback>
      </View>
      <View style={[styles.resInfoPaddingBottom]}/>
    </View>
  </View>

  );
}