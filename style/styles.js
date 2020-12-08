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
    lightmode: {
      backgroundColor: colors.liteBG,
      color: colors.accentPrim,
    },
    lightmode2: {
      backgroundColor: colors.liteBG,
      color: 'black',
    },
    dividingLine: {
        color: '#777777',
        height: 0,
        width: '100%',
        borderWidth: 1
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
    textColor: {
      color: 'white',
    },
    textColorDark: {
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
    padding: {
      flex: 0.5,
      width: 20,
      height: '10%',
    },
    paddingLine: {
      flex: 0.1,
      width: 20,
      height: '3%',
    },
    // Home Page -----------------------------
    homeContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%'
    },
    homePadding: {
      height: '5%'
    },
    darkmodeToggleContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 15
    },
    homeContentContainer: {
      alignSelf: 'flex-start',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '70%'
    },
    logo: {
      resizeMode: 'contain',
      height: '40%',
      width: '100%',
      margin: 20
    },
    homeGuidanceContainer: {
      marginBottom: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    homeGuidance: {
      fontSize: 20,
      fontStyle: 'italic'
    },
    // end Home Page -----------------------------
    // Preferences -------------------------------
    prefContainer: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: '100%', 
      margin: 'auto'
    },
    prefSearchSection: {
      flexDirection: 'row',
      backgroundColor: '#FFF',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    prefInputBox: {
      flex: 1,
      backgroundColor: '#FFF',
      height: 36,
      padding: 10,
      borderRadius: 5,
      marginTop: 5,
      marginBottom: 5
    },
    prefSubmitBtn: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#6B222D',
      color: '#FFF',
      borderRadius: 5,
      height: 36,
      marginTop: 5,
      marginBottom: 200
    },
    prefButton: {
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        height: 36,
        width: '30%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    prefButtonText: {
        textAlign: 'center',
        fontSize: 12
    },
    prefAnswers: {
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    prefHeader: {
      textAlign: 'left',
      color: '#6B222D',
      fontSize: 16,
      marginTop: 10,
      width: '80%'
    },
    prefCenterHeader: {
      textAlign: 'center',
      color: '#6B222D',
      fontSize: 16,
      marginTop: 5,
      marginBottom: 5
    },
    prefLabels: {
      width: '80%', 
      alignSelf: 'center'
    },
    // end Preferences ---------------------------
    // Recipe Search -----------------------------
    recipeSearchContainer: { 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: '100%', 
      margin: 'auto', 
      marginBottom: 50 
    },
    recipeCenterHeader: {
      width: '80%',
      textAlign: 'center',
      color: '#6B222D',
      fontSize: 14,
      paddingBottom: 5
    },
    recipeSubHeader: {
      width: '80%',
      height: '5%',
      textAlign: 'center',
      color: '#6B222D',
      fontSize: 14,
      paddingTop: 5
    },
    recipeInputBox: {
      backgroundColor: '#FFF',
      width: '80%',
      height: 36,
      paddingLeft: 20,
      paddingRight: 5,
      borderRadius: 5,
      marginTop: 5,
      marginBottom: 5,
      alignContent: 'center',
      alignItems: 'center',
    },
    recipeSuggestBtn: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: '#FFF',
      color: '#6B222D',
      borderRadius: 8,
      margin: 4,
      width: '80%',
      height: 36
    },
    recipeSuggestBtnText: {
      color: colors.accentPrim
    },
    // end Recipe Search -------------------------
    // Budget Log --------------------------------
    budgetLeft: {
      textAlign: 'left',
    },
    budgetMiddle: {
      textAlign: 'center',
    },
    budgetRight: {
      textAlign: 'right',
    },
    budgetGreet: {
      textAlign: 'center',
      color: '#6B222D',
      fontSize: 16,
      marginTop: 20,
      marginBottom: 20,
    },
    budgetAmount: {
      textAlign: 'center',
      fontSize: 35, 
      fontWeight: 'bold',
      marginBottom: 20,
    },
    budgettHistory: {
      textAlign: 'left',
      marginBottom: 10
    },
    budgetButton: {
      fontSize: 18
    },
    budgetContainer: {
      paddingHorizontal: 15
    },
    budgetButtonContainer: {
      padding: 8,
      marginLeft: 70,
      marginRight: 70,
      height: 40,
      marginTop: 10,
      marginBottom: 20,
      borderRadius: 6
    },
    budgetTransactionContainer: {
      height: '100%'
    },
    // end Budget Log ----------------------------
    // Log Pop up --------------------------------
    popUptext: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    input: {
      height: 40,
      borderBottomColor: 'gray',
      marginLeft: 30,
      marginRight: 30,
      marginTop: 20,
      marginBottom: 10,
      borderBottomWidth: 1
    },
    logPopupButton: { 
      fontSize: 18, 
      color: 'white'
    },
    logPopupButtonContainer: {
      padding: 8,
      marginLeft: 70,
      marginRight: 70,
      height: 40,
      borderRadius: 6,
      backgroundColor: '#6B222D'
    },
    // end Log Pop up ----------------------------
    // Generate Restaurant -----------------
    genResQuestion: {
      fontSize: 20,
      marginBottom: 20
    },
    genResPadding: {
      height: 10
    },
    genResButton: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 10,
      height: 50,
      width: MODULE_WIDTH,
      borderRadius: MODULE_RADIUS,
    },
    genResButtonText: {
      fontSize: 20,
      fontWeight: "bold",
      alignSelf: "center",
    },
    // end Generate Restaurant --------------
    // RestaurantInfo ----------------
    resInfoPaddingline: {
      flex: 0.1,
      width: 20,
      height: '3%',
    },
    resInfoPadding: {
      flex: 0.5,
      width: 20,
      height: 10,
    },
    resInfoPaddingBottom: {
      flex: 2,
      width: '5%',
      height: '15%',
    },
    resInfoTextStyle: {
      fontSize: 16,
      // fontWeight: 'bold'
    },
    resInfoRow: {
      flexDirection: 'row',
      width: MODULE_WIDTH,
      alignContent: 'center',
      justifyContent: 'flex-start'
    },
    resInfoButton: {
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: '#999999',
      padding: 10,
      height: 50,
      borderRadius: MODULE_RADIUS,
      borderWidth: 0,
      width: 0.40*SCALING_WIDTH,
    },
    resInfoButtonText: {
      fontWeight: 'bold',
      fontSize: 18
    },
    resInfoRestaurauntImage: {
      width: MODULE_WIDTH,
      height: '30%',
      borderRadius: MODULE_RADIUS,
      resizeMode: 'cover',
    },
    resInfoScreen: {
      width: '100%',
      flex: 1,
      alignContent: 'flex-start',
      flexDirection: 'column'
    },
    resInfoButtonGap: {
      width: 0.05*SCALING_WIDTH,
      flex: 1,
    },
    resInfoMainViewer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      padding: 5
    },
    resInfoRestaurantName: { 
      fontSize: 45, 
      fontWeight: 'bold', 
      textAlign: 'center'
    },
    resInfoIntroText: {
      fontSize: 25
    },
    // end RestaurantInfo ----------------
    // Restaurant List -------------------
    resListContainer: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center', 
      margin: 'auto', 
      width: '100%'
    },
    resListPrompt: {
      padding: 10, 
      fontSize: 20, 
      color: '#6b222d', 
      textAlign: 'center'
    },
    resListTextInput: {
      height: 40, 
      paddingLeft: 10, 
      width: '80%', 
      backgroundColor: 'white', 
      borderRadius: 5
    },
    resListTextItem: {
      color: '#6b222d',
      padding: 10,
      fontSize: 22,
    },
    resListViewItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    resListInputContainer: {
      width: '80%', 
      height: '50%'
    },
    resListInputScrollView: { 
      marginTop: 10, 
      marginBottom: 10, 
      backgroundColor: 'white', 
      borderRadius: 5
    },
    resListSubmitContainer: {
      backgroundColor: '#6b222d', 
      width: '80%',
      marginBottom: 100,
      borderRadius: 10, 
      marginTop: 10,
      padding: 10
    },
    resListSubmitText: { 
      fontSize: 20, 
      textAlign: 'center', 
      color: '#ffffff'
    },
    // end Restaurant List ---------------
    // Navbar ----------------------------
    navDarkmodeIcon: {
      backgroundColor: 'transparent',
      color: colors.accentPrimDark,
    },
    navLightmodeIcon: {
      backgroundColor: 'transparent',
      color: colors.accentPrim,
    },
    navContainer: {
      position: 'absolute',
      height: 67,
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
      width: '17.5%',
      marginBottom: 4
    },
    navButtonCenter: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'transparent',
      width: '30%',
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
    },
    navDarkmode: {
      backgroundColor: colors.liteBG,
      color: colors.accentPrim
    },
    navLightmode: {
      backgroundColor: 'white',
      color: colors.accentPrim
    },
    // end Navbar --------------------------
});

export default styles;
