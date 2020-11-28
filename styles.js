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
    darkmode: {
      backgroundColor: darkBG,
      color: accentColorPrimDark,
      borderColor: '#cccccc'
    },
    lightmode: {
      backgroundColor: liteBG,
      color: accentColorPrim,
      borderColor: '#555555'
    },
    darkmodeIcon: {
      backgroundColor: 'transparent',
      color: accentColorPrimDark,
    },
    lightmodeIcon: {
      backgroundColor: 'transparent',
      color: accentColorPrim,
    },
    navContainer: {
      position: 'absolute',
      height: 75,
      width: '100%',
      bottom: 0,
    },
    navbar: {
      display: 'flex',
      position: 'relative',
      height: '100%',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      flexDirection: 'row',
      elevation: 10
    },
    navbarText: {      
      fontSize: 13,
      fontWeight: 'bold',
      flexWrap: 'wrap',
      textAlign: 'center',
      marginBottom: 2
    },
    navButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5
    },
    navButtonCenter: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 5,
      backgroundColor: 'transparent'
    },
    navCircle: {
      position: 'absolute',
      height: 120,
      width: 125,
      alignSelf: 'center',
      borderRadius: 90,
      bottom: 0,
      elevation: 10
    }
});

  export default styles;