import { StyleSheet } from 'react-native';

/* hex colors for elements */
const appCream = "#E2D6C8"; // LIGHT and DARK mode: top margin bg
const appBrown = "#6B222D"; // LIGHT and DARK mode: navbar text colors 
                                      // DARK mode: bg and yes/no text
                                     // LIGHT mode: question text 

const appBrownUnselected = "#6B222D37";                                    

/* DARK mode: yes/no button colors */
const appYes = "#CAA892";
const appNo = "#F2E9E0"; // same color as DARK mode: question text, navbar buttons, and navbar bg 
                                       // LIGHT mode: bg

const appTitle = "#442C1E"; // LIGHT and DARK mode: title text
const appWhite = "#FFF"; // LIGHT mode: yes/no text, navbar buttons, and navbar bg


/* LIGHT mode: yes/no button colors */
const appYesLight = "#A6433F";
const appNoLight = "#E18A77";

const styles = StyleSheet.create({
    /* dark mode bg elements */
    background: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: appBrown,
    },
    hideExtension: { // center extension extends beyond navBar; this covers that
        backgroundColor: appBrown,
        width: "100%",
        height: "200%",
        position: "absolute",
        bottom: "-200%",
    },

    /* light mode bg elements */
    backgroundLight: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: appNo,
    },
    hideExtensionLight: { // center extension extends beyond navBar; this covers that
        backgroundColor: appNo,
        width: "100%",
        height: "200%",
        position: "absolute",
        bottom: "-200%",
    },
    
    /* light and dark top margin elements (everything same for both) */ 
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
    
    /* dark mode body elements */
    questionFont: {
        fontSize: 40,
        color: appNo,
    },
    yesNoFont: { // text for yes/no buttons
        fontSize: 40,
        color: appBrown,
        fontWeight: "bold",
    },
    yesButton: {
        elevation: 8,
        backgroundColor: appYes,
        borderRadius: 6,
        width: 320,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
    },
    noButton: {
        elevation: 8,
        backgroundColor: appNo,
        borderRadius: 6,
        width: 320,
        height: 70,
        justifyContent: "center",
        alignItems: "center",
    },
    
    /* light mode body elements */
    questionFontLight: {
        fontSize: 20,
        color: appBrown,
    },
    yesNoFontLight: { // text for yes/no buttons
        fontSize: 20,
        color: appWhite,
        fontWeight: "bold",
        alignSelf: "center",
        fontFamily: "",
    },
    yesButtonLight: {
        elevation: 8,
        backgroundColor: appYesLight,
        borderRadius: 6,
        width: 180,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    noButtonLight: {
        elevation: 8,
        backgroundColor: appNoLight,
        borderRadius: 6,
        width: 180,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    
    /* light and dark body elements */
    bodyBox: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        top: "30%", 
    },
    buttonContainer: { // container for yes and no buttons
        width: "100%",
        height: "13%",
        alignItems: "center",
        top: "8%",
        justifyContent: "space-between",
    },
    
    /* dark mode nav bar elements */
    nonCenter: { // the other four buttons that are not the center button
        elevation: 8,
        backgroundColor: appNo,
        width: "18%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    center: { // center button
        elevation: 8,
        backgroundColor: appNo,
        width: "28%",
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    centerExtension: { // custom extension to the center button
        width: "100%", 
        height: "180%", 
        position: "absolute", 
        borderTopEndRadius: 90,
        borderTopLeftRadius: 90,
        backgroundColor: appNo,
        top: "-80%",
    },
    centerExtCover: { // extends the nav bar to cover the empty space behind the center extension
        width: "28%",
        height: "180%",
        position: "absolute", 
        borderTopEndRadius: 90,
        borderTopLeftRadius: 90,
        backgroundColor: appNo,
        top: "-80%",
        position: "absolute",
        left: "36%",
    },
    navBar: {
        backgroundColor: appNo,
        width: "100%",
        height: "15%",
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
    },
    
    /* light mode nav bar elements */
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

        marginTop: 10,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowColor: "#000",
        elevation: 10,

        width: "100%",
        height: "10%",
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
    },
    
    /* light and dark nav bar elements */
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
