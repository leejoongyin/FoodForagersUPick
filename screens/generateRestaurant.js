import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, Image } from 'react-native';
import styles from "../styles/generateRestaurantStyles.js";

const { Component } = require('react');

class generateRestaurantScreen extends Component {
    constructor(props) {
        super(props);
    }

    yesPressed = () => {
        this.props.navigation.navigate('list');
    }

    noPressed = () => {
        this.props.navigation.navigate('preferences');
    }

    render() {
        return (
            <ImageBackground
                style={styles.backgroundLight}
            >   
                <View style={styles.bodyBox}>
                    <Text style={styles.questionFontLight}>Do you have any restaurants in mind?</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.yesButtonLight}
                                          onPress={this.yesPressed}                
                        >
                            <Text style={styles.yesNoFontLight}>Yes</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.noButtonLight}
                                          onPress={this.noPressed}
                        >
                            <Text style={styles.yesNoFontLight}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.navBarLight}>
                    <View style={styles.centerExtCoverLight}></View> 
                    
                    <TouchableOpacity style={styles.nonCenterLight}>
                        <Image 
                            source={require("../assets/edit_unselected.png")}
                            style={styles.buttonImage}
                        ></Image>
                        <Text style={styles.navFont}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.nonCenterLight}>
                        <Image 
                            source={require("../assets/group_unselected.png")}
                            style={styles.buttonImage}
                        ></Image>
                        <Text style={styles.navFont}>Join Group</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.centerLight}>
                        <View style={styles.centerExtensionLight}></View>
                        <Image 
                            source={require("../assets/restaurant_selected.png")}
                            style={styles.centerButtonImage}
                        ></Image>
                        <Text style={styles.centerTopFont}>Generate</Text>
                        <Text style={styles.centerFont}>Recommendation</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.nonCenterLight}>
                        <Image 
                            source={require("../assets/recipe_unselected.png")}
                            style={styles.buttonImage}
                        ></Image>
                        <Text style={styles.navFont}>Recipe</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.nonCenterLight}>
                        <Image 
                            source={require("../assets/budget_unselected.png")}
                            style={styles.buttonImage}
                        ></Image>
                        <Text style={styles.navFont}>Budget</Text>
                    </TouchableOpacity>

                    <View style={styles.hideExtensionLight}></View>
                </View>
            </ImageBackground>
        );
    }
}

export default generateRestaurantScreen;