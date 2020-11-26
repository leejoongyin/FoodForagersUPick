import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, Image } from 'react-native';
import styles from "../styles/generateRestaurantStyles.js";

function generateRestaurant(props) {
    return (
        <ImageBackground
            style={styles.backgroundLight}
        >   
        
            {/* body: question + yes and no buttons */}
            <View style={styles.bodyBox}>
                {/* question */}
                <Text style={styles.questionFontLight}>Do you have any restaurants in mind?</Text>

                {/* yes and no buttons */}
                <View style={styles.buttonContainer}>
                    {/* yes */}
                    <TouchableOpacity style={styles.yesButtonLight}>
                        <Text style={styles.yesNoFontLight}>Yes</Text>
                    </TouchableOpacity>
                    {/* no */}
                    <TouchableOpacity style={styles.noButtonLight}>
                        <Text style={styles.yesNoFontLight}>No</Text>
                    </TouchableOpacity>
                </View>
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
    );
}

export default generateRestaurant;