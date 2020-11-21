import { StyleSheet } from 'react-native';

const darkBG = '#121212';
const liteBG = 'white';
const accentColorPrim = '#992929';
const accentColorSec = '#441111';
const isDarkmode = true;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
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
      color: 'black',
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
      backgroundColor: '#ff0000',
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
    beginButtonText: {
      backgroundColor: '#999999',
      fontSize: 20
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
    }
  });

  export default styles;