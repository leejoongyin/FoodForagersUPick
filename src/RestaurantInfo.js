import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import '../assets/McDonalds.png'//logo from './assets/mcds.jpg'
import colors from '../style/colors';
import Navbar from '../src/Navbar';
import {buttonStyles} from '../style/styles';

const restaurauntImage = '../assets/splash.png';

export default function App(props) {
  var isDarkmode=props.route.params.isDarkmode;
  var mode = (isDarkmode?styles.darkmode:styles.lightmode);
  var mode2 = (isDarkmode?styles.darkmode2:styles.lightmode2);
  var buttonColor1= (isDarkmode?styles.buttonColor1Dark:styles.buttonColor1);

  return (
  <View style = {[styles.screen]}>
    {/*
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
    </View>*/}
    
    <View style={[styles.mainViewer, mode ]}>
      <View style={styles.padding2}/>
      <Text style={[{color: '#EEEEEE', fontSize: 25}, mode2]}>Let's go to:</Text>
      <Text style={[{color:'white', fontSize: 50, fontWeight: 'bold'}, mode]}>McDonald's</Text>
      <View style={styles.padding2}/>
      <Image source={require('../assets/McDonalds.png')} style={[styles.restaurauntImage]} /> 
      {/*<StatusBar style="auto" />*/}
      <View style={[styles.infoContainer]}>
        <View style={[styles.infoRow ]}>
          <Text style={[styles.textStyle_2, mode2, {fontWeight: "bold"}]}>Hours: </Text>
          <Text style={[styles.textStyle_2, mode2, {fontWeight: "bold", fontStyle: 'italic'}]}>Open Now </Text>
          <Text style={[styles.textStyle_2, mode2]}>until 7pm </Text>
        </View>
        <View style={[styles.infoRow]}>
          <Text style={[styles.textStyle_2, mode2, {fontWeight: "bold"}]}>Location: </Text>
          <Text style={[styles.textStyle_2, mode2 ]}>1234 Street Ave. City, ST 91234</Text>
        </View>
        <View style={[styles.infoRow]}>
          <Text style={[styles.textStyle_2, mode2, {fontWeight: "bold"}]}>Phone Number: </Text>
          <Text style={[styles.textStyle_2, mode2 ]}>123-123-1234</Text>
        </View>
        
        
        <View style={styles.padding2}/>
        <View style={[styles.infoRow]}>
            <View>
              <TouchableOpacity
                onPress={() => alert('Hello, world!')}
                style={[styles.button, buttonColor1]}
              >
                <Text style={[styles.textStyle_3,buttonColor1]}>View Menu</Text>
                
              </TouchableOpacity>
            </View>
            <View style={[styles.buttonGap]}/>
            <View>
              <TouchableOpacity
                onPress={() => alert('Hello, world!')}
                style={[styles.button, buttonColor1]}
              >
                <Text style={[styles.textStyle_3,buttonColor1]}>Call Now</Text>
              </TouchableOpacity>
            </View>  
             
        </View>
      </View>
      <View style = {styles.padding2}/>
      <View style={{height: '10%', flex: -1}}/>
    </View>
    
    <Navbar isDarkmode={props.route.params.isDarkmode} navigation={props.navigation}/>
  </View>
           
  );
}

const infoRowWidth = 0.85 * Dimensions.get('window').width;

const styles = StyleSheet.create({
  lightmode: {
    backgroundColor: colors.liteBG,
    color: colors.accentPrim,
    borderColor: '#555555'
  },
  darkmode: {
    backgroundColor: colors.darkBG,
    color: 'white',
    borderColor: '#cccccc'
  },
  lightmode2: {
    backgroundColor: colors.liteBG,
    color: 'black',
  },
  darkmode2: {
    backgroundColor: colors.darkBG,
    color: colors.liteBG,
  },
  buttonColor1: {
    backgroundColor: colors.accentPrim,
    color: 'white',
  },
  buttonColor1Dark: {
    backgroundColor: colors.accentPrimDark,
    color: colors.accentPrim,
  },
  padding: {
    flex: 0.1,
    width: 20,
    height: 20,
  }, 
  padding2: {
    flex: 0.2,
    width: 40,
    height: 40,
  },  
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
    fontSize: 18
  },

  textStyle_3: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
   
  },

  box1: {
    width: '100%',
    backgroundColor: '#202020',
  },

  box2: {       
  },

  box3: {
    width: '100%',
  },

  container: {
    backgroundColor: '#477979',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    flex: 1,
    borderWidth: 0
  },

  mainViewer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 5
  },

  container_2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flex: 1,
    padding: 5
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 0,
    //flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    width: infoRowWidth,
    alignContent: 'center',
    justifyContent: 'flex-start'
  },

  infoContentText: {
    fontSize: 20

  },

  button: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#999999',
    padding: 0,
    height: 50,
    borderRadius: 10,
    borderWidth: 0,
    width: 0.40*Dimensions.get('window').width,
  },

  buttonGap: {
    width: 0.05*Dimensions.get('window').width,
    flex: 1,
  }, 

  outline: {
    borderWidth: 5,
    borderColor: 'red', 
    backgroundColor: 'blue',
  },
  restaurauntImage: {
    width: 0.85*Dimensions.get('window').width, 
    height: 0.30*Dimensions.get('window').height, 
    borderRadius: 2,
    resizeMode: 'contain'
  },

  screen: {
    width: Dimensions.get('window').width,
    flex: 1,
    alignContent: 'flex-start',
    flexDirection: 'column'
  }

  
});