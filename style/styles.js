import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';


const isDarkmode = true;

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

export const SCALING_WIDTH = ( WINDOW_WIDTH < WINDOW_HEIGHT ? WINDOW_WIDTH : 0.6 * WINDOW_HEIGHT );

export const FOCUS_MODULE_SCALE = 0.88;

export const SCREEN_MARGIN = (1-FOCUS_MODULE_SCALE)/2

export const MODULE_RADIUS = 10;

export const MODULE_WIDTH = FOCUS_MODULE_SCALE * SCALING_WIDTH;
export const MODULE_FRAME = 0.15 * MODULE_WIDTH;
export const INNER_MODULE_WIDTH = MODULE_WIDTH - (2* MODULE_FRAME);

const styles = StyleSheet.create({
    barCodeScanner: {
      height: INNER_MODULE_WIDTH,
      width: INNER_MODULE_WIDTH,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      alignContent: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%'
    },
    containerRow:{
      flex: 1,
      alignItems: 'stretch',
      alignContent: 'center',
      flexDirection: 'row'
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
    darkmode: {
      backgroundColor: colors.darkBG,
      color: 'white',
    },
    darkmode2: {
      backgroundColor: colors.darkBG,
      color: colors.liteBG,
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
      backgroundColor: colors.liteBG,
      color: colors.accentPrim,
    },
    lightmode2: {
      backgroundColor: colors.liteBG,
      color: 'black',
    },
    logo: {
      resizeMode: 'contain',
      height: '25%',
      width: '100%',
    },
    icon: {
      resizeMode: 'contain',
      height: '50%',
      width: '50%',
      padding: 2
    },
    mainViewer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: 5
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
    navDarkmode: {
      backgroundColor: colors.liteBG,
      color: colors.accentPrim
    },
    navLightmode: {
      backgroundColor: 'white',
      color: colors.accentPrim
    },

    buttonEnabled: {
      backgroundColor: colors.accentPrim
    },
    buttonText: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: 'center'
    },
    button: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: '#999999',
      padding: 10,
      height: 50,
      width: 0.5*SCALING_WIDTH,
      borderRadius: MODULE_RADIUS,
      borderWidth: 0,
      borderColor: (isDarkmode?'white':'black'),
    },
    buttonColor1: {
      backgroundColor: colors.accentPrim,
      color: 'white',
    },
    buttonColor2:{
      backgroundColor: colors.accentSec,
      color: 'white',
    },
    buttonColor3: {
      backgroundColor: colors.accentTer,
      color: 'white',
    },
    buttonColor1Dark: {
      backgroundColor: colors.accentPrimDark,
      color: colors.accentPrim,
    },
    buttonColor2Dark:{
      backgroundColor: colors.accentSecDark,
      color: colors.accentPrim,
    },
    buttonColor3Dark: {
      backgroundColor: colors.accentTerDark,
      color: colors.accentPrim,
    },
    buttonFocused: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: '#999999',
      padding: 10,
      height: 50,
      width: MODULE_WIDTH,
      borderRadius: MODULE_RADIUS,
    },
    header: {
      backgroundColor: colors.headerTintColor,
    },
    headerText: {
      alignSelf: 'center',
    },
    inputBox: {
      flex: 1,
      backgroundColor: 'white',
      height: 50,
      padding: 5,
      borderRadius: 5,
    },
    guidance: {
      fontSize: 20,
      fontStyle: 'italic'
    },
    module: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: 'white',
      height: MODULE_WIDTH,
      width: MODULE_WIDTH,
      flex:-1,
      borderRadius: MODULE_RADIUS,
    },
    moduleRow: {
      flexDirection: 'row',
      height: MODULE_FRAME,
      alignContent: 'center',
      alignItems: 'center',
      width: '100%',
      flex: -1,

    },
    moduleText:{
      color: 'black',
    },
    moduleCorner: {
      height: MODULE_FRAME,
      width: MODULE_FRAME,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },
    outline: {
      borderWidth: 2,
      borderColor: colors.accentPrim,
    },
    paddingLine: {
      flex: 0.1,
      width: 20,
      height: '3%',
    },
    padding: {
      flex: 0.5,
      width: 20,
      height: 20,
    },
    paddingBottom: {
      flex: 2,
      width: '5%',
      height: '15%',
    },
    paddingManual: {
      height: 20,
      width: 20,
    },
    paddedView: {
      padding: 8,
      height: '100%',
      width: '100%'
    },
    scannerContainer: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      borderRadius: MODULE_RADIUS,
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
    },
    darkmodeIcon: {
      backgroundColor: 'transparent',
      color: colors.accentPrimDark,
    },
    lightmodeIcon: {
      backgroundColor: 'transparent',
      color: colors.accentPrim,
    },
    navContainer: {
      position: 'absolute',
      height: 69,
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
      fontSize: 11,
      fontWeight: 'bold',
      flexWrap: 'wrap',
      textAlign: 'center',
      marginBottom: 5
    },
    navButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '18%',
      marginBottom: 4
    },
    navButtonCenter: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'transparent',
      width: '25%',
      marginBottom: 4
    },
    navCircle: {
      position: 'absolute',
      height: 110,
      width: 110,
      alignSelf: 'center',
      borderRadius: 110,
      bottom: -12,
      elevation: 10
    }
});

export default styles;
