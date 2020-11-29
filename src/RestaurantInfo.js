import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import logo from './assets/mcds.jpg'

export default function App() {
  return (
  <View>
    
    <View style ={styles.navBar}>
      <View style={styles.box1}>
        <Text style={{color: '#99CCFF', fontSize: 60, textAlign:'center'}}>{'<'}</Text>
      </View>
      <View style={styles.box2}>
        <Text style={[styles.textStyle]}>Recommendation:</Text>
      </View>
      <View style={styles.box3}>
        <Text style={[styles.textStyle]}></Text>
      </View>
    </View>

    <View style={styles.container}>
      <Text style={{color: '#EEEEEE', fontSize: 35}}>Let's go to:</Text>
      <Text style={{color:'white', fontSize: 60}}>McDonald's</Text>
      <Image source={logo} style={{ width: 650, height: 400, borderRadius: 20 }} /> 
      <StatusBar style="auto" />
      <Text style={[styles.textStyle_2]}>Hours :</Text>
      <Text style={[styles.textStyle_2]}>Location :</Text>
      <Text style={[styles.textStyle_2]}>Phone Number :</Text>
    </View>

    <View style={styles.container_2}>
        <View>
          <TouchableOpacity
            onPress={() => alert('Hello, world!')}
            style={styles.button}>
            <Text style={styles.textStyle_3}>View Menu</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => alert('Hello, world!')}
            style={styles.button}>
            <Text style={styles.textStyle_3}>Call Now</Text>
          </TouchableOpacity>
        </View>       
    </View>
    
  </View>
           
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#404040',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  
  },

  textStyle: {
    color: '#99CCFF',
    fontSize: 45,
  },

  textStyle_2: {
    color: '#EEEEEE',
    fontSize: 35
  },

  textStyle_3: {
    fontSize: 40,
    color: '#fff',
    padding: 20,
    textAlign: 'center'
   
  },

  box1: {
    width: 60,
    backgroundColor: '#202020',
  },

  box2: {       
  },

  box3: {
    width: 60,
  },

  container: {
    backgroundColor: '#477979',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container_2: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor:'#477979',
    padding: 50,
  },

  button: {
    backgroundColor: '#404040',
    borderRadius: 20,
    width: 350,
    margin: 20
  },

  
});