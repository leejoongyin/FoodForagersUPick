import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import '../assets/McDonalds.png'//logo from './assets/mcds.jpg'
import colors from '../style/colors';
import styles, {SCALING_WIDTH, MODULE_WIDTH, MODULE_RADIUS} from '../style/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking} from 'react-native';

class RestaurantFromList extends Component {
    
    generateRecommendatation(e) {
        if( e.length == 0 ) {
            return "";
        }
        var i = Math.floor(Math.random()*e.length);
        return e[i];
    }

    
    constructor(props) {
        super(props);

        this.state = {
            restaurantList: this.props.route.params.restaurantList,
            recommendation: this.generateRecommendatation(this.props.route.params.restaurantList),
        }
    }

    showRecommendation = () => {
        var isDarkmode = this.props.route.params.isDarkmode;
        var mode = (isDarkmode?styles.darkmode:styles.lightmode);
        var mode2 = (isDarkmode?styles.darkmode2:styles.lightmode2);
        if( this.state.restaurantList.length == 0 ) {
            
            return (
                <Text style={[ mode2, { fontSize: 25, width: MODULE_WIDTH, textAlign: 'center' }]}>
                    There are no items in your restaurant list!
                </Text>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={[ mode2, { fontSize: 25 }]}>We Picked:</Text>
                    <Text style={[ mode, { fontSize: 45, fontWeight: 'bold', textAlign: 'center'} ]}>{this.state.recommendation}</Text>
                </View>
            );
        }
    }

    render() {
        
        var isDarkmode = this.props.route.params.isDarkmode;
        var mode = (isDarkmode?styles.darkmode:styles.lightmode);

        return (
            <View style={[styles.container, mode ]}>
                <View style={[styles.padding]}/>
                <this.showRecommendation isDarkmode={isDarkmode}/>
                <View style={[styles.padding]}/>
                <Image
                    source={require('../assets/Picasso.png')}
                    style={[styles.logo, {height: '50%', width: SCALING_WIDTH }]}
                />
                <View style={[styles.padding]}/>
            </View>
        );
    }
}

export default RestaurantFromList;