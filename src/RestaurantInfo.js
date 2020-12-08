import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { Image, Text, View, TouchableWithoutFeedback } from 'react-native';
import '../assets/McDonalds.png'//logo from './assets/mcds.jpg'
import styles from '../style/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking} from 'react-native';

const restaurauntImage = '../assets/splash.png';

export default class RestaurantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
    };
    this.isDarkmode = this.props.isDarkmode;

    this.getStoredData();

  }
  getStoredData = async () => {
    await this.getData('restaurant_name').then((result) => {
      this.setState({name: result});
    });
    await this.getData('image').then((result) => {
      this.setState({image: result});
    });
    await this.getData('location').then((result) => {
      this.setState({location: result});
    });
    await this.getData('url').then((result) => {
      this.setState({url: result});

    });
    await this.getData('phone').then((result) => {
      this.setState({phone: result});
      this.setState({loading: false});
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
  openMenu = () => {
    Linking.canOpenURL(this.state.url).then((supported) => {
      if (supported) {
        Linking.openURL(this.state.url);
      } else {
        alert(
          "Cannot Open the link!",
          "The webpage seems to be offline at the moment.",
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
    });
  }
  render() {
    var isDarkmode = this.props.route.params.isDarkmode;
    var mode = (isDarkmode?styles.darkmode:styles.lightmode);
    var mode2 = (isDarkmode?styles.darkmode2:styles.lightmode2);
    var buttonColor1 = (isDarkmode?styles.buttonColor1Dark:styles.buttonColor1);

    return (
    <View style = {[styles.resInfoScreen]}>
      {!this.state.loading && (
      <View style={[ styles.resInfoMainViewer, mode ]}>
        <View style={[styles.resInfoPadding]}/>
        <Text style={[ mode2, styles.resInfoIntroText]}>Let's go to:</Text>
        <Text style={[ mode, styles.resInfoRestaurantName ]}>{this.state.name}</Text>
        <View style={[styles.resInfoPadding]}/>
        <Image
          source={{uri: this.state.image}}
          style={[styles.resInfoRestaurauntImage]}
        />
        <View style={[styles.resInfoPadding]}/>
        <View style={[styles.paddingLine]}/>
        <View style={[styles.resInfoRow]}>
          <Text style={[styles.resInfoTextStyle, mode2]}>Location:  </Text>
          <Text style={[styles.resInfoTextStyle, mode2 ]}>{this.state.location}</Text>
        </View>
        <View style={[styles.paddingLine]}/>
        <View style={[styles.resInfoRow]}>
          <Text style={[styles.resInfoTextStyle, mode2]}>Phone Number:   </Text>
          <Text style={[styles.resInfoTextStyle, mode2 ]}>{this.state.phone}</Text>
        </View>
        <View style={[styles.paddingLine]}/>
        <View style={[styles.paddingLine]}/>
        <View style={[styles.resInfoRow]}>
          <TouchableWithoutFeedback onPress={this.openMenu}>
            <View style={[styles.resInfoButton, buttonColor1]}>
              <Text style={[styles.resInfoButtonText, buttonColor1]}> View Menu </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={[styles.resInfoButtonGap]}/>
          <TouchableWithoutFeedback onPress={() => alert('Hello, world!')}>
            <View style={[styles.resInfoButton, buttonColor1]}>
              <Text style={[styles.resInfoButtonText, buttonColor1]}> Call Now </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={[styles.resInfoPaddingBottom]}/>
      </View>)}
    </View>
    );
  }
}