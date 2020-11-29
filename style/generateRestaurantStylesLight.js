import { StyleSheet } from 'react-native';

/* hex colors for light mode elements */
const appCream = "#E2D6C8"; // top margin bg
const appBrown = "#6B222D"; // navbar text colors and question text 

const appBrownUnselected = "#6B222D37"; // unselected navbar button text                                   

const appNo = "#F2E9E0"; // body bg

const appTitle = "#442C1E"; // title text
const appWhite = "#FFF"; // yes/no text, navbar buttons, and navbar bg


/* yes/no button colors */
const appYesLight = "#A6433F";
const appNoLight = "#E18A77";

const styles = StyleSheet.create({
    /* bg elements */
    backgroundLight: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: appNo,
    },
    
    /* top margin elements */ 
    topMargin: {
        width: "100%",
        height: "10%",
        backgroundColor: appCream,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    titleFont: {
        fontSize: 17,
        color: appTitle,
        alignSelf: "center",
    },
    backButton: {
        elevation: 8,
        backgroundColor: appCream,
        borderRadius: 6,
        width: "5%",
        height: "100%",
        position: "absolute",
        left: "4%",
        justifyContent: "center",
        alignItems: "center",
    },
    backButtonImage: {
        width: 60,
        height: 60,
        resizeMode: "contain",
    },
    
    /* body elements */
    questionFontLight: {
        fontSize: 20,
        color: appBrown,
        marginBottom: 10
    },
    yesNoFontLight: { // text for yes/no buttons
        fontSize: 20,
        color: appWhite,
        fontWeight: "bold",
        alignSelf: "center",
        fontFamily: "",
    },
    yesButtonLight: {
        backgroundColor: appYesLight,
        borderRadius: 6,
        justifyContent: 'center',
        width: 180,
        height: 40,
        marginBottom: 10
    },
    noButtonLight: {
        backgroundColor: appNoLight,
        borderRadius: 6,
        justifyContent: 'center',
        width: 180,
        height: 40,
    },
    bodyBox: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        top: "30%", 
    },
    buttonContainer: { // container for yes and no buttons
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    
    /* nav bar elements */
    nonCenterLight: { // the other four buttons that are not the center button
        elevation: 8,
        backgroundColor: appWhite,
        width: "18%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    centerLight: { // center button
        elevation: 8,
        backgroundColor: appWhite,
        width: "28%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    centerExtensionLight: { // custom extension to the center button
        width: "100%", 
        height: "180%", 
        position: "absolute", 
        borderTopEndRadius: 90,
        borderTopLeftRadius: 90,
        backgroundColor: appWhite,
        top: "-60%",
    },
    centerExtCoverLight: { // extends the nav bar to cover the empty space behind the center extension
        width: "28%",
        height: "180%",
        position: "absolute", 
        borderTopEndRadius: 90,
        borderTopLeftRadius: 90,
        backgroundColor: appWhite,
        top: "-60%",
        position: "absolute",
        left: "36%",
    },
    navBarLight: {
        backgroundColor: appWhite,
        width: "100%",
        height: "10%",
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
    },
    navFont: { // non-center button text (non-selected)
        fontSize: 10,
        position: "absolute",
        bottom: 6,
        color: appBrownUnselected,
        opacity: 37, // non-selected
    },
    centerFont: {
        fontSize: 10,
        position: "absolute",
        bottom: 6,
        color: appBrown,
    },
    centerTopFont: { // style for 'Generate' text in center button (selected)
        fontSize: 10,
        position: "absolute",
        bottom: 20,
        color: appBrown,
    },
    centerButtonImage: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        position: "absolute",
        bottom: "60%",
    },
    buttonImage: { // non-center button images
        width: 40,
        height: 40,
        resizeMode: "contain",
        position: "absolute",
        bottom: "25%",
    },
})

export default styles;