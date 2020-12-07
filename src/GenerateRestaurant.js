import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from "../style/styles.js";

const { Component } = require('react');

class generateRestaurantScreen extends Component {
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
        var mode = (isDarkmode?styles.darkmode:styles.lightmode);
        var buttonColorYes = (isDarkmode?styles.buttonColor1Dark:styles.buttonColor2);
        var buttonColorNo = (isDarkmode?styles.buttonColor2Dark:styles.buttonColor3);
        var buttonTextColor = (isDarkmode?styles.textColorDark:styles.textColor);
        
        return (
            <View style={[styles.container, mode]}>
                <Text style={[styles.genResQuestion, mode]}>Do you have any restaurants in mind?</Text>
                <View>
                    <TouchableWithoutFeedback onPress={this.yesPressed}>
                        <View style={[styles.buttonFocused, buttonColorYes]}>
                            <Text style={[styles.genResButtonText, buttonTextColor]}> Yes </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.genResPadding}></View>
                    <TouchableWithoutFeedback onPress={this.noPressed}>
                        <View style={[styles.buttonFocused, buttonColorNo]}>
                            <Text style={[styles.genResButtonText, buttonTextColor]}> No </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {/*<View style={styles.navBarLight}>
                    <View style={styles.centerExtCoverLight}></View>

                    <TouchableWithoutFeedback style={styles.nonCenterLight}>
                        <Image
                            source={require("../assets/edit_unselected.png")}
                            style={styles.buttonImage}
                        ></Image>
                        <Text style={styles.navFont}>Edit</Text>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={styles.nonCenterLight}>
                        <Image
                            source={require("../assets/group_unselected.png")}
                            style={styles.buttonImage}
                        ></Image>
                        <Text style={styles.navFont}>Join Group</Text>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={styles.centerLight}>
                        <View style={styles.centerExtensionLight}></View>
                        <Image
                            source={require("../assets/restaurant_selected.png")}
                            style={styles.centerButtonImage}
                        ></Image>
                        <Text style={styles.centerTopFont}>Generate</Text>
                        <Text style={styles.centerFont}>Recommendation</Text>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={styles.nonCenterLight}>
                        <Image
                            source={require("../assets/recipe_unselected.png")}
                            style={styles.buttonImage}
                        ></Image>
                        <Text style={styles.navFont}>Recipe</Text>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={styles.nonCenterLight}>
                        <Image
                            source={require("../assets/budget_unselected.png")}
                            style={styles.buttonImage}
                        ></Image>
                        <Text style={styles.navFont}>Budget</Text>
                    </TouchableWithoutFeedback>

                </View>*/}
            </View>
        );
    }
}

export default generateRestaurantScreen;
