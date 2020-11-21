import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';

import styles from './styles';

const { Component } = require("react");

const Navbar = ({ mode }) => {
    return (
        <View style = {[ styles.navbar, mode ]}>
            <View style = {[ styles.dividingLine, mode ]}/>
            <View style = {{ flex: 1 }} />
            <Text style = {[ styles.navbarText, mode, { fontWeight: 'bold'} ]}> PLACEHOLDER NAVBAR </Text>
            <View style = {{ flex: 1 }}/>
        </View>
    );
    
}

export default Navbar;