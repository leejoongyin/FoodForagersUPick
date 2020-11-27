import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, Switch, Alert } from 'react-native';


import React, {Component} from 'react';


import './Navbar';
import Navbar from './Navbar';
import styles from './styles';

class EatingAlone extends Component {
    constructor(props){
        super(props);
        const {navigation, isDarkmode}= this.props;
        const mode = (this.props.isDarkmode ? styles.darkmode: styles.lightmode);
        //console.log( "Eating Alone( isDarkmode: " + this.props.isDarkmode + ")");
    }
    render(props) {
        console.log( "Eating Alone( isDarkmode: " + this.props.isDarkmode + ")");
        var mode = (this.props.isDarkmode ? styles.darkmode: styles.lightmode);
        return( 
            <View style={styles.outline, styles.containerModule}>
                <View style = {styles.padding}/>

                <View style = {styles.padding}/>
                <Text style = {[mode, styles.text]} > or get a recomendation just for you: </ Text>
                <View style = {styles.padding}/>
                <TouchableWithoutFeedback  title = 'Generate' onPress={()=>{this.props.navigation.navigate("Placeholder", {isDarkmode: this.props.isDarkmode})}}> 
                    <View style = {[ mode, styles.buttonFocused, (this.props.isDarkmode? styles.buttonColor2Dark: styles.buttonColor1), {height: 75}  ]}>
                        <Text style = {[mode, styles.beginButtonText,  (this.props.isDarkmode? styles.buttonColor2Dark: styles.buttonColor1) ]}> 
                            Generate restaurant 
                        </Text>
                        <Text style = {[mode, styles.beginButtonText, (this.props.isDarkmode? styles.buttonColor2Dark: styles.buttonColor1) ]}> 
                            recomendation 
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );

    }
}

class QRCode extends Component {
    constructor(props){
        super(props);
    }
    render() {
        var mode = (this.props.isDarkmode ? styles.darkmode: styles.lightmode);
        return( 
            <View style = {[ styles.containerModule, styles.outline ]}>
                <Text style = {mode} > //Implement QRCode Component</ Text>
            </ View>
        );

    }
}

class QRScanner extends Component {
    constructor(props){
        super(props);
    }
    render() {
        var mode = (this.props.isDarkmode ? styles.darkmode: styles.lightmode);
        return( 
            <View style = {[ styles.containerModule, styles.outline ]}>
                <Text style = {mode} > // Implement QRScanner Component </ Text> 
            </View>
        );

    }
}
class GroupsAccommodationsPage extends Component {
    constructor(props) {
        super(props);
        const {isDarkmode = false} = this.props.route.params;
        var { mode } = (this.props.route.params.isDarkmode ? styles.darkmode: styles.lightmode);
        const { navigation } = this.props;
        this.state = {
            showState: 1
        }
        console.log("Groups( isDarkmode: " + isDarkmode + ")");
        //Alert.alert( "Group Accomodations render, State: " + this.state.showState);
    };

    static navigationOptions = {
        headerTitleStyle: { alignSelf: 'center' },
        title: 'Center Title',
        headerRight: (<View />)
    }

    showEatingAlone = () => {
        if( this.state.showState != 1 ) {
            return null;
        }
        return ( 
            <View>
                <View style = {styles.padding}/>
                <EatingAlone isDarkmode={this.props.route.params.isDarkmode} navigation={this.props.navigation} />
            </View>
            
        );
    }
    showQRScanner = () => {
        if( this.state.showState != 2 ) {
            return null;
        }
        return ( 
            <View>
                <View style = {styles.padding}/>
                <QRScanner isDarkmode={this.props.route.params.isDarkmode} navigation={this.props.navigation}/>
            </View>
            
        );
    }
    showQRcode = () => {
        if( this.state.showState != 3 ) {
            return null;
        }
        return ( 
            <View>
                <View style = {styles.padding}/>
                <QRCode isDarkmode={this.props.route.params.isDarkmode} navigation={this.props.navigation} />
            </View>
            
        );
    }

    onJoinPressed = () => {
        console.log( "Join Pressed");
        if( this.state.showState == 2) {
            this.setState(prevState => ({
                showState: 1
              }));
        } else {
            this.setState(prevState => ({
                showState: 2
            }));
        }
        //Alert.alert( "Group Accomodations render, State: " + this.state.showState);
    }

    onInvitePressed = () => {
        this.props.navigation.navigate("Placeholder", {isDarkmode: this.props.route.params.isDarkmode});
        //Alert.alert( "Group Accomodations render, State: " + this.state.showState);
        this.setState(prevState => ({
            showState: 1
          }));
    }
    render( props ) {
        this.mode  = (this.props.route.params.isDarkmode ? styles.darkmode: styles.lightmode);
        console.log( this.props.isDarkmode + " : " + this.mode);
        console.log(this.state.showState);
        return(
            <View style = {[styles.container, this.mode]}>
                <View style = {[ this.mode, styles.padding ]} />
                <View style = {[styles.containerList, styles.lightmode, this.mode]}>
                    <Text style={[ styles.lightmode, this.mode, styles.text ]}>Are you eating with friends?</Text>
                    <View style = {styles.padding}/>
                    <TouchableWithoutFeedback  title = 'Join' onPress={this.onJoinPressed}> 
                        <View 
                            style = {[ 
                                this.mode, styles.buttonFocused, 
                                (this.props.route.params.isDarkmode? styles.buttonColor2Dark: styles.buttonColor2 ) 
                            ]}
                        >
                            <Text 
                                style = {[
                                    this.mode, styles.beginButtonText, 
                                    (this.props.route.params.isDarkmode? styles.buttonColor2Dark: styles.buttonColor2 )
                                ]}
                            > 
                                Join a Group 
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <this.showQRScanner/>
                    <View style = {styles.padding}/>
                    <TouchableWithoutFeedback  title = 'Invite' onPress={this.onInvitePressed}> 
                        <View style = {[ 
                            this.mode, styles.buttonFocused, 
                            (this.props.route.params.isDarkmode? styles.buttonColor3Dark: styles.buttonColor3 ) 
                        ]}>
                            <Text style = {[
                                this.mode, styles.beginButtonText, 
                                (this.props.route.params.isDarkmode? styles.buttonColor3Dark: styles.buttonColor3 )
                            ]}> 
                                Invite to a Group 
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <this.showQRcode />

                    <this.showEatingAlone/>
                </View>
                <View style = {[ this.mode, styles.padding, {flex: 0.7}]} />
                <Navbar isDarkmode={this.props.route.params.isDarkmode}/>
            </View>
        );

    }
  }
  export default GroupsAccommodationsPage;