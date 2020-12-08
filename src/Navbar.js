import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from '../style/styles.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Navbar(props) {
      var mode = ( props.isDarkmode? styles.navDarkmode : styles.navLightmode );
      const iconMode = (props.isDarkmode ? styles.navDarkmodeIcon: styles.navLightmodeIcon);
      return (
          <View style = {[ styles.navContainer, mode ]}>
              <View style = {[ styles.navCircle, mode ]}/>
              <View style = {[ styles.navbar, mode ]}>
                  <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Edit Preferences', {isDarkmode: props.isDarkmode})}>
                      <View style = {[ styles.navButton, iconMode ]}>
                          <Icon name="circle-edit-outline" size={30} style = {[ mode ]} />
                          <Text style = {[ styles.navbarText, mode]}>Edit </Text>
                      </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Group Accommodations', {isDarkmode: props.isDarkmode})}>
                      <View style = {[ styles.navButton, iconMode ]}>
                          <Icon name="account-group" size={35} style = {[ mode ]} />
                          <Text style = {[ styles.navbarText, mode]}>Join Group </Text>
                      </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Generate', {isDarkmode: props.isDarkmode})}>
                      <View style = {[ styles.navButtonCenter, iconMode ]}>
                          <Icon name="silverware-fork-knife" size={40} style = {[ mode ]} />
                          <Text style = {[ styles.navbarText, mode]}> {' Generate \n  Recommendation '} </Text>
                      </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Search Recipe', {isDarkmode: props.isDarkmode})}>
                      <View style = {[ styles.navButton, iconMode ]}>
                          <Icon name="book-search-outline" size={30} style = {[ mode ]} />
                          <Text style = {[ styles.navbarText, mode]}>Recipe </Text>
                      </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Budget Log', {isDarkmode: props.isDarkmode})}>
                      <View style = {[ styles.navButton, iconMode ]}>
                          <Icon name="currency-usd" size={30} style = {[ mode ]} />
                          <Text style = {[ styles.navbarText, mode]}>Budget </Text>
                      </View>
                  </TouchableWithoutFeedback>
              </View>
          </View>
      );
}
