import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from '../style/styles.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isDarkmode: this.props.isDarkmode
        }
    }

    render() {

        var mode = ( this.props.isDarkmode? styles.darkmodeB : styles.lightmodeB );
        var iconMode = (this.props.isDarkmode? styles.darkmodeIcon: styles.lightmodeIcon );
        
        return (
            <View style = {[ styles.navContainer, mode ]}>
                <View style = {[ styles.navCircle, mode ]}></View>
                <View style = {[ styles.navbar, mode ]}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Preferences')}>
                        <View style = {[ styles.navButton, iconMode ]}>
                            <Icon name="circle-edit-outline" size={35} style = {[ mode ]} />
                            <Text style = {[ styles.navbarText, mode]}> Edit </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Group Accommodations')}>
                        <View style = {[ styles.navButton, iconMode ]}>
                            <Icon name="account-group" size={40} style = {[ mode ]} />
                            <Text style = {[ styles.navbarText, mode]}> Join Group </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}>
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

export default Navbar;