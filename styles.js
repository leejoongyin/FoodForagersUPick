import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

const accentColorPrim = colors.accentPrim;
const accentColorSec = colors.accentSec;
const accentColorTer = colors.accentTer;
const accentColorPrimDark = colors.accentPrimDark;
const accentColorSecDark = colors.accentSecDark;
const accentColorTerDark = colors.accentTerDark;
const isDarkmode = true;

const darkBG = colors.darkBG;
const liteBG = colors.liteBG;

const headerTintColor = colors.headerTintColor;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      alignContent: 'center',
      flexDirection: 'column'
    },
    containerModule: {
      height: 200, 
      flex: -1,
      alignItems: 'center',
      borderColor: 'white',
      alignContent: 'center',
      flexDirection: 'column'
    },
    containerList: {
      flex: 1,     
      alignItems: 'center',
      width: '100%',
      padding: 5,
      alignContent: 'center',
      flexDirection: 'column'
    },

    mainViewer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: 5
    },
    darkmode: {
      backgroundColor: darkBG,
      color: 'white',
      borderColor: '#cccccc'
    },
    darkmodeToggleContainer: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
  
      height: 50, 
      width: '100%',
    },
    dividingLine: {
        color: '#777777',
        height: 0,
        width: '100%',
        borderWidth: 1
    },
    lightmode: {
      backgroundColor: liteBG,
      color: accentColorPrim,
      borderColor: '#555555'
    },
    logo: {
      resizeMode: 'contain',
      height: '40%',
      width: '100%',
    },
    navbar: {
      alignSelf: 'center',
      height: 75,
      flex:0,
      width: '100%',
      alignItems: 'center',
      alignContent: 'center',
      flexDirection: 'column',
      fontSize: 25
    },
    navbarText: {      
      fontSize: 25
    },
    default: {
      backgroundColor: (isDarkmode?darkBG:liteBG),
      color: (isDarkmode?liteBG:'black')  
    },
    beginButton: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: '#999999',
      padding: 10,
      height: 50,
      width: '50%',
      borderRadius: 10,
      borderWidth: 0,
      borderColor: (isDarkmode?'white':'black')
    },
    buttonEnabled: {
      backgroundColor: accentColorPrim
    },
    beginButtonText: {
      backgroundColor: '#999999',
      fontSize: 20,
      fontWeight: "bold"
    },
    button: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: '#999999',
      padding: 10,
      height: 50,
      width: '50%',
      borderRadius: 10,
      borderWidth: 0,
      borderColor: (isDarkmode?'white':'black'),
    },
    buttonColor1: {
      backgroundColor: accentColorPrim,  
      color: 'white',
    },
    buttonColor2:{
      backgroundColor: accentColorSec,
      color: 'white',
    }, 
    buttonColor3: {
      backgroundColor: accentColorTer,
      color: 'white',
    },
    buttonColor1Dark: {
      backgroundColor: accentColorPrimDark, 
      color: accentColorPrim, 
    },
    buttonColor2Dark:{
      backgroundColor: accentColorSecDark,
      color: accentColorPrim,
    }, 
    buttonColor3Dark: {
      backgroundColor: accentColorTerDark,
      color: accentColorPrim,
    },
    buttonFocused: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: '#999999',
      padding: 10,
      height: 50,
      width: 0.75*Dimensions.get('window').width,
      borderRadius: 10,
      borderWidth: 0,
      borderColor: (isDarkmode?'white':'black'),
    }, 
    header: {
      //textAlign:"center",
      alignSelf: 'center',
      backgroundColor: headerTintColor,
    },
    outline: {
      borderWidth: 1,
      borderColor: 'red',
    },
    padding: {
      height: 20
    },
    statusBar: {
        height: 25
    },
    title: {
      fontWeight: 'bold',
      fontSize: 50
    },
    text: {
      fontSize: 18
    }
  });

  export default styles;