import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from './styles.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// const { Component } = require("react");  

// import HomeS from './App.js';
// import RecipeS from './dummies/recipeDummy.js';
// import BudgetS from './dummies/budgetDummy.js';
// import EditS from './dummies/editDummy.js';
// import GroupS from './dummies/groupDummy.js';

// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

// class HomeScreen extends React.Component {  
//     render() {  
//         return ( 
//             // <View>
//                 <HomeS />
//             // {/* </View> */}
//         );  
//     }  
// }  
// class BudgetScreen extends React.Component {  
//     render() {  
//         return ( 
//             // <View>
//                 <BudgetS />
//             // {/* </View>  */}
//         );  
//     }  
// }
// class EditScreen extends React.Component {  
//     render() {  
//         return (  
//             // <View>
//                 <EditS />
//             // {/* </View> */}
//         );  
//     }  
// }
// class GroupScreen extends React.Component {  
//     render() {  
//         return (  
//             // <View>
//                 <GroupS />
//             // {/* </View> */}
//         );  
//     }  
// }
// class RecipeScreen extends React.Component {  
//     render() {  
//         return (
//             // <View>
//                 <RecipeS />
//             // {/* </View> */}
//         );  
//     }  
// }

// const TabNavi = createMaterialTopTabNavigator({
//     Home: {
//         screen: HomeScreen
//       },
//       Budget: {
//         screen: BudgetScreen
//       },
//       Recipe: {
//         screen: RecipeScreen
//       },
//       Group: {
//         screen: GroupScreen
//       },
//       Edit: {
//         screen: EditScreen
//       }
// });


// const AppContainer = createAppContainer(AppNavigator);
// const Navbar = ({ isDarkmode, navigation: navigate }) => {
const Navbar = ({ isDarkmode }) => {
    const mode = (isDarkmode?styles.darkmode: styles.lightmode);
    const iconMode = (isDarkmode?styles.darkmodeIcon: styles.lightmodeIcon);
    return (
        <View style = {[ styles.navContainer, mode ]}>
            <View style = {[ styles.navCircle, mode ]}></View>
            <View style = {[ styles.navbar, mode ]}>
                <TouchableWithoutFeedback onPress={() => alert('Pressed')}>
                    <View style = {[ styles.navButton, iconMode ]}>
                        <Icon name="circle-edit-outline" size={35} style = {[ mode ]} />
                        <Text style = {[ styles.navbarText, mode]}> Edit </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => alert('Pressed')}>
                    <View style = {[ styles.navButton, iconMode ]}>
                        <Icon name="account-group" size={40} style = {[ mode ]} />
                        <Text style = {[ styles.navbarText, mode]}> Join Group </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => alert('Pressed')}>
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
                {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('Budget')}></TouchableWithoutFeedback> */}
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

export default Navbar;