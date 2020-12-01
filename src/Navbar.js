import React, {Component} from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import styles from '../style/styles.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../style/colors.js';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isDarkmode: this.props.isDarkmode
        };
    }
    render() {
        var mode = ( this.props.isDarkmode? styles.navDarkmode : styles.navLightmode );
        const iconMode = (this.props.isDarkmode ? styles.darkmodeIcon: styles.lightmodeIcon);
        return (
            <View style = {[ styles.navContainer, mode ]}>
                <View style = {[ styles.navCircle, mode ]}></View>
                <View style = {[ styles.navbar, mode ]}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Edit Preferences', {isDarkmode: this.props.isDarkmode})}>
                        <View style = {[ styles.navButton, iconMode ]}>
                            <Icon name="circle-edit-outline" size={35} style = {[ mode ]} />
                            <Text style = {[ styles.navbarText, mode]}> Edit </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Group Accommodations', {isDarkmode: this.props.isDarkmode})}>
                        <View style = {[ styles.navButton, iconMode ]}>
                            <Icon name="account-group" size={40} style = {[ mode ]} />
                            <Text style = {[ styles.navbarText, mode]}> Join Group </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home', {isDarkmode: this.props.isDarkmode})}>
                        <View style = {[ styles.navButtonCenter, iconMode ]}>
                            <Icon name="silverware-fork-knife" size={45} style = {[ mode ]} />
                            <Text style = {[ styles.navbarText, mode]}> Generate </Text>
                            <Text style = {[ styles.navbarText, mode]}> Recommendation  </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => alert('Pressed')}>
                        <View style = {[ styles.navButton, iconMode ]}>
                            <Icon name="book-search-outline" size={35} style = {[ mode ]} />
                            <Text style = {[ styles.navbarText, mode]}> Recipe </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => alert('Pressed')}>
                        <View style = {[ styles.navButton, iconMode ]}>
                            <Icon name="currency-usd" size={35} style = {[ mode ]} />
                            <Text style = {[ styles.navbarText, mode]}> Budget </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    } 
}
