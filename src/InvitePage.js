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
import localController from './controller/localController';
import dbController from './controller/dbController';
import KEYS from "./config/keys.json";
import axios from 'axios';

const apiKey = KEYS.yelp.api_key;
class InvitePage extends Component {
    constructor(props){
        super(props);
        this.state = {
          continue: false
        }
        this.getStoredData();
    }

    componentWillUnmount() {
        dbController.removeMember(this.props.route.params.getGroupCode(), this.state.zipcode, this.state.time, this.state.budgetArray, this.state.dietArray, this.state.cuisineArray, this.state.restaurantArray);
    }

    getStoredData = async () => {
        await localController.getData('zipcode').then((result) => {
            this.setState({zipcode: result});
            console.log(`InvitePage.js: Loaded zipcode with ${this.state.zipcode}.`);
        });
        await localController.getData('time').then((result) => {
            var monday = new Date();
            monday.setDate(monday.getDate() + (7 - monday.getDay()) % 7 + 1);
            monday.setHours(0, 0, 0, 0);
            var fixedTime =  (monday < new Date(result)) ? parseInt(new Date(result).getTime() / 1000) - 604800 : parseInt(new Date(result).getTime() / 1000);
            this.setState({time: fixedTime});
            console.log(`InvitePage.js: Loaded time with ${this.state.time}.`);
        });
        await localController.getData('budget').then((result) => {
            this.setState({budgetArray: result });
            console.log(`GroupAccommodationsPage.js: Loaded budgetArray with ${this.state.budgetArray}.`);
        });
        await localController.getData('diet').then((result) => {
            this.setState({dietArray: result});
            console.log(`GroupAccommodationsPage.js: Loaded dietArray with ${this.state.dietArray}.`);
        });
        await localController.getData('cuisine').then((result) => {
            this.setState({cuisineArray: result});
            console.log(`GroupAccommodationsPage.js: Loaded cuisineArray with ${this.state.cuisineArray}.`);
        });
        await localController.getData('restaurant').then((result) => {
            this.setState({restaurantArray: result});
            console.log(`GroupAccommodationsPage.js: Loaded restaurantArray with ${this.state.restaurantArray}.`);
        });
    }

    returnRestaurant = async () => {
      let budget, filter;
      await dbController.parseSearch(this.props.route.params.getGroupCode()).then((search) => {
        filter = search[0];
        budget = search[1];
      });

      console.log(`InvitePage.js: Searching with \n
        \t categories: ${filter}\n
        \t open_at: ${this.state.time}\n
        \t location: ${this.state.zipcode}\n
        \t price: ${budget.length ? budget.join(',') : "1,2,3,4"}`);
      await axios.get(`https://api.yelp.com/v3/businesses/search`, {
        headers: {'Authorization': `Bearer ${apiKey}`},
        params: {
          limit: 20,
          categories: filter,
          open_at: this.state.time,
          location: this.state.zipcode,
          price: (budget.length ? budget.join(',') : "1,2,3,4"),
        }
      }).then((response) => {
        if (response.data.total) {
          this.setState({continue: true});
          random = Math.floor(Math.random() * Math.min(response.data.total, 20));
          localController.storeData('restaurant_name', response.data.businesses[random].name);
          localController.storeData('image', response.data.businesses[random].image_url);
          localController.storeData('location', response.data.businesses[random].location.address1 + ". \n" + response.data.businesses[random].location.city +  ", " + response.data.businesses[random].location.state);
          localController.storeData('phone', response.data.businesses[random].display_phone);
          localController.storeData('url', response.data.businesses[random].url);
        } else {
          this.setState({continue: false});
          Alert.alert('Error', "Could not find any restaurants! Please change your preferences.");
        }
      }).catch((error) => {
        this.setState({continue: false});
        Alert.alert('Error', 'We encountered an issue contacting the Yelp API. Please try again later.')
      });
    }

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

                    <TouchableWithoutFeedback
                    title = 'Generate'
                    onPress={
                        ()=>{
                          this.returnRestaurant().then(() => {
                            if (this.state.continue) {
                              this.props.navigation.navigate(
                                "Restaurant Info",
                                {isDarkmode: isDarkmode}
                              );
                            }
                          });
                        }
                    }>
                        <View style = {[ mode, styles.buttonFocused, (isDarkmode? styles.buttonColor2Dark: styles.buttonColor1)  ]}>
                            <Text style = {[mode, styles.buttonText,  (isDarkmode? styles.buttonColor2Dark: styles.buttonColor1) ]}>
                                Generate recommendation
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <View style={[styles.paddingManual]}/>
                    {/*
                    <TouchableWithoutFeedback
                        title = 'Generate'
                        onPress={()=>{
                            this.props.navigation.navigate(
                                "Restaurant From List",
                                {isDarkmode: isDarkmode, restaurantList: this.props.route.params.getRestaurantList() }
                            )
                        }}
                    >
                        <View style = {[ mode, styles.buttonFocused, (isDarkmode? styles.buttonColor2Dark: styles.buttonColor1)  ]}>
                            <Text style = {[mode, styles.buttonText,  (isDarkmode? styles.buttonColor2Dark: styles.buttonColor1) ]}>
                                Generate recomendation from Restaurant List
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    */}
                    <View style={styles.paddingBottom}/>
                </View>
            </View>
        )

    }
}

export default InvitePage;
