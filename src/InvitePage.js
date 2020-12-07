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
import AsyncStorage from '@react-native-async-storage/async-storage';
import KEYS from "./config/keys.json";
import axios from 'axios';
import db from './base';

const apiKey = KEYS.yelp.api_key;
class InvitePage extends Component {
    constructor(props){
        super(props);
        this.getStoredData();
    }
    getStoredData = async () => {
        this.getData('zipcode').then((result) => {
            this.setState({zipcode: result});
            console.log('zipcode: ', this.state.zipcode);
        });
        this.getData('time').then((result) => {
            var monday = new Date();
            monday.setDate(monday.getDate() + (7 - monday.getDay()) % 7 + 1);
            monday.setHours(0, 0, 0, 0);
            var fixedTime =  (monday < new Date(result)) ? parseInt(new Date(result).getTime() / 1000) - 604800 : parseInt(new Date(result).getTime() / 1000);
            this.setState({time: fixedTime});
            console.log('time: ', this.state.time);
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

    getRestaurantFromYelp = async () => {

        // parsing for categories parameter
        var budgetCSV, dietCSV, cuisineCSV, restaurantCSV;
        budgetCSV = dietCSV = cuisineCSV = restaurantCSV = '';
    
        var numBudget; // numerical value corresponding to each '$...' symbol
        var filter;
        var bnbChosen = false;
        var maxVal = 0;
        var index = 0;
        let cat = [];

        const bChoices = ["1","2","3"];
        const dChoices = ["Vegan", "Vegetarian", "Kosher", "Halal", "Gluten free"];
        const cChoices = ["Chinese","American","Mexican","Italian","Japanese","Korean",
                "Thai", "Vietnamese", "Indian"];
        const rChoices = ["Breakfast","Brunch","Bars","Fast Food","Dessert",
                "Bubble tea", "Coffee Shops", "BBQ"];

        let bArray = [];
        let dArray = [];
        let cArray = [];
        let rArray = [];

        this.firebaseRef = db.database().ref(this.props.route.params.getGroupCode());

        await this.firebaseRef.child('Budget').once('value').then((snapshot) => {
            maxVal = 0;
            index = 0;
            if (snapshot.exists()) {

                for (let budget of bChoices) {
                    if (snapshot.child(budget).exists()) {

                        if (parseInt(snapshot.child(budget).val()) >= maxVal) {
                            if (parseInt(snapshot.child(budget).val()) > maxVal) {
                                bArray = [];
                                index = 0;
                            }
                            maxVal = parseInt(snapshot.child(budget).val());
                            bArray[index] = budget;
                            index++;
                        }
                    }
                }
                // budget
                for (var i = 0; i < bArray.length; i++) {

                    if (i == bArray.length - 1) {
                        budgetCSV = budgetCSV + numBudget;
                    }
                    if (i != bArray.length - 1) {
                        budgetCSV = budgetCSV + numBudget + ',';
                    }
                }
            }
        });

        await this.firebaseRef.child('Diet').once('value').then((snapshot) => {
            maxVal = 0;
            index = 0;
            if (snapshot.exists()) {
                for (let diet of dChoices) {
                    if (snapshot.child(diet).exists()) {

                        if (parseInt(snapshot.child(diet).val()) >= maxVal) {
                            if (parseInt(snapshot.child(diet).val()) > maxVal) {
                                dArray = [];
                                index = 0;
                            }
                            maxVal = parseInt(snapshot.child(diet).val());
                            dArray[index] = diet;
                            index++;
                        }
                    }
                }
                // diet
                for (var i = 0; i < dArray.length; i++) {
            
                    var temp = dArray[i].toLowerCase();
            
                    if (temp === "gluten free") {temp = "gluten_free";}
            
                    if (i == dArray.length - 1) {
                        dietCSV = dietCSV + temp;
                    }
                    if (i != dArray.length - 1) {
                        dietCSV = dietCSV + temp + ',';
                    }
                    console.log("diet: " + temp + '\n');
                }
            }
        });

        await this.firebaseRef.child('Cuisine').once('value').then((snapshot) => {
            maxVal = 0;
            index = 0;
            if (snapshot.exists()) {
                for (let cuisine of cChoices) {
                    if (snapshot.child(cuisine).exists()) {

                        if (parseInt(snapshot.child(cuisine).val()) >= maxVal) {
                            if (parseInt(snapshot.child(cuisine).val()) > maxVal) {
                                cArray = [];
                                index = 0;
                            }
                            maxVal = parseInt(snapshot.child(cuisine).val());
                            cArray[index] = cuisine;
                            index++;
                        }
                    }
                }
                // cuisine
                for (var i = 0; i < cArray.length; i++) {
            
                    var temp = cArray[i].toLowerCase();
            
                    if (temp === "indian") {temp = "indpak"}
                    if (temp === "american") {temp = "tradamerican"}
            
                    cat.push(temp);
                    console.log("cuisine: " + temp + '\n');
                }
            }
        });

        await this.firebaseRef.child('Restaurant').once('value').then((snapshot) => {
            maxVal = 0;
            index = 0;
            if (snapshot.exists()) {
                for (let restaurant of rChoices) {
                    if (snapshot.child(restaurant).exists()) {

                        if (parseInt(snapshot.child(restaurant).val()) >= maxVal) {
                            if (parseInt(snapshot.child(restaurant).val()) > maxVal) {
                                cArray = [];
                                index = 0;
                            }
                            maxVal = parseInt(snapshot.child(restaurant).val());
                            rArray[index] = restaurant;
                            index++;
                        }
                    }
                }
                // restaurant type
                for (var i = 0; i < rArray.length; i++) {
            
                    var temp = rArray[i].toLowerCase();
            
                    if ((temp === "breakfast" || temp === "brunch")) {
                        if (!bnbChosen) {
                            temp = "breakfast_brunch";
                            bnbChosen = true;
                        } else {
                            temp = null;
                        }
                    }
                    if (temp === "fast food") {temp = "hotdogs"}
                    if (temp === "dessert") {temp = "desserts"}
                    if (temp === "bubble tea") {temp = "bubbletea"}
                    if (temp === "coffee shops") {temp = "coffee"}
            
                    if (temp) {cat.push(temp);}
                    console.log("restaurant: " + temp + '\n');
                }
            }
            // prioritize diet restrictions since categories is: this,that = "this OR that"
            if (dietCSV !== '') {
                filter = dietCSV;
            } else {
                filter = cat.join(',');
            }
        
            console.log(`filter is ${filter}`);
        });

        return filter;
    }

    returnRestaurant = async (f) => {
        await axios.get(`https://api.yelp.com/v3/businesses/search`, {
            headers: {'Authorization': `Bearer ${apiKey}`},
            params: {
                limit: 1,
                categories: f,
                //open_at: this.state.time,
                location: this.state.zipcode
              }
          }).then((response) => {
            console.log(response.data.businesses[0].name);
            this.storeData('restaurant_name', response.data.businesses[0].name);
            this.storeData('image', response.data.businesses[0].image_url);
            this.storeData('location', response.data.businesses[0].location.address1 + ". \n" + response.data.businesses[0].location.city +  ", " + response.data.businesses[0].location.state);
            this.storeData('phone', response.data.businesses[0].display_phone);
            this.storeData('url', response.data.businesses[0].url);
          });
    }
    
    storeData = async (key,value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key,jsonValue)
        } catch (e) {
          // saving error
          alert('error: ', e);
        }
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
                          this.getRestaurantFromYelp().then((filter) => {
                              this.returnRestaurant(filter).then(() => {
                                this.props.navigation.navigate(
                                    "Restaurant Info",
                                    {isDarkmode: this.props.isDarkmode}
                                );
                            });
                          });

                        }
                    }>
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
