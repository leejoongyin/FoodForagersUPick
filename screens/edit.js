import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, Image } from 'react-native';
import styles from "../styles/generateRestaurantStyles.js";

function edit(props) {
    return (
        <ImageBackground style={styles.backgroundLight}>

            {/* place holder for body */}
            <View style={{
                width: "100%",
                height: "25%",
                alignItems: "center",
                position: "absolute",
                top: "35%",
            }}>
                <Text style={{fontSize: 40}}>Edit Preferences Body</Text>
            </View>

            {/* bottom navbar w/ buttons: 'Edit', 'Join Group', Generate Recommendation', 'Recipe', 'Budget' */}
            <View style={styles.navBarLight}>
                <View style={styles.centerExtCoverLight}></View> {/* for covering center extension */}
                {/* edit button */}
                <TouchableOpacity style={styles.nonCenterLight}>
                    <Image 
                        source={require("../assets/edit_unselected.png")}
                        style={styles.buttonImage}
                    ></Image>
                    <Text style={styles.navFont}>Edit</Text>
                </TouchableOpacity>

                {/* join group button */}
                <TouchableOpacity style={styles.nonCenterLight}>
                    <Image 
                        source={require("../assets/group_unselected.png")}
                        style={styles.buttonImage}
                    ></Image>
                    <Text style={styles.navFont}>Join Group</Text>
                </TouchableOpacity>

                {/* CENTER: generate recommendation button */}
                <TouchableOpacity style={styles.centerLight}>
                    <View style={styles.centerExtensionLight}></View>
                    <Image 
                        source={require("../assets/restaurant_selected.png")}
                        style={styles.centerButtonImage}
                    ></Image>
                    <Text style={styles.centerTopFont}>Generate</Text>
                    <Text style={styles.centerFont}>Recommendation</Text>
                </TouchableOpacity>

                {/* recipe button */}
                <TouchableOpacity style={styles.nonCenterLight}>
                    <Image 
                        source={require("../assets/recipe_unselected.png")}
                        style={styles.buttonImage}
                    ></Image>
                    <Text style={styles.navFont}>Recipe</Text>
                </TouchableOpacity>

                {/* budget button */}
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

export default edit;