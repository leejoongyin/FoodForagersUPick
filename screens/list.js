import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, Image } from 'react-native';
import styles from "../styles/generateRestaurantStylesLight.js";

const { Component } = require('react');

class listScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ImageBackground style={styles.backgroundLight}>

                <View style={{
                    width: "100%",
                    height: "25%",
                    alignItems: "center",
                    position: "absolute",
                    top: "35%",
                }}>
                    <Text style={{fontSize: 30}}>View/Edit List Placeholder</Text>
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
        )
    }
}

export default listScreen;