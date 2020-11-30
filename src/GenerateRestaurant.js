import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import generateRestaurantStyle from "../style/generateRestaurantStylesLight.js";
import styles from "../style/styles.js";
import Navbar from './Navbar';

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
        return (
            <View style={[styles.container,mode]}>   
                <Text style={[generateRestaurantStyle.questionFontLight,mode]}>Do you have any restaurants in mind?</Text>
                <View style={[styles.padding]}/>

                <View style={[generateRestaurantStyle.buttonContainer,mode]}>
                    <TouchableOpacity 
                        style={[
                            generateRestaurantStyle.yesButtonLight,
                            (isDarkmode?styles.buttonColor1Dark:styles.buttonColor2)
                        ]}
                        onPress={this.yesPressed}                
                    >
                        <Text 
                            style={[
                                generateRestaurantStyle.yesNoFontLight,
                                (isDarkmode?styles.buttonColor1Dark:styles.buttonColor2)
                        ]}>
                            Yes
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[
                            generateRestaurantStyle.yesButtonLight,
                            (isDarkmode?styles.buttonColor2Dark:styles.buttonColor3)
                        ]}
                        onPress={this.noPressed}
                    >
                        <Text 
                            style={[
                                generateRestaurantStyle.yesNoFontLight,
                                (isDarkmode?styles.buttonColor2Dark:styles.buttonColor3)
                        ]}>
                            No
                        </Text>
                    </TouchableOpacity>
                </View>
                <Navbar isDarkmode={this.props.route.params.isDarkmode} navigation={this.props.navigation}/>
                {/*<View style={styles.navBarLight}>
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
                    
                </View>*/}
            </View>
        );
    }
}

export default generateRestaurantScreen;