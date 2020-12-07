import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import generateRestaurantStyle from "../style/generateRestaurantStylesLight.js";
import styles from "../style/styles.js";

const { Component } = require('react');

export default class EditPreferences extends Component {
    constructor(props) {
        super(props);
    }

    yesPressed = () => {
        this.props.navigation.navigate('Restaurant List');
    }

    noPressed = () => {
        this.props.navigation.navigate('Preferences');
    }

    render() {
        var isDarkmode = this.props.route.params.isDarkmode;
        var mode = (isDarkmode ? styles.darkmode: styles.lightmode );

        return (
            <View style={[styles.container,mode]}>
                <Text style={[generateRestaurantStyle.questionFontLight,mode]}>Which would you like to edit?</Text>
                <View style={[styles.paddingManual]}/>
                <View style={[generateRestaurantStyle.buttonContainer,mode]}>
                    <TouchableOpacity style={[generateRestaurantStyle.yesButtonLight,(isDarkmode?styles.buttonColor1Dark:styles.buttonColor2)]}
                                        onPress={this.yesPressed}
                    >
                        <Text style={[generateRestaurantStyle.yesNoFontLight,(isDarkmode?styles.buttonColor1Dark:styles.buttonColor2)]}>Restaurant List</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[generateRestaurantStyle.yesButtonLight,(isDarkmode?styles.buttonColor2Dark:styles.buttonColor3)]}
                                        onPress={this.noPressed}
                    >
                        <Text style={[generateRestaurantStyle.yesNoFontLight,(isDarkmode?styles.buttonColor2Dark:styles.buttonColor3)]}>Preferences</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
