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
                <Text style = {mode} > or get a recomendation just for you: </ Text>
                <View style = {styles.padding}/>
                <TouchableWithoutFeedback  title = 'Generate' onPress={()=>{this.props.navigation.navigate("Next Page", {isDarkmode: this.props.isDarkmode})}}> 
                    <View style = {[ mode, styles.buttonFocused, styles.buttonEnabled, {height: 75, width: '100%'}  ]}>
                        <Text style = {[mode, styles.beginButtonText,  styles.buttonEnabled ]}> 
                            Generate restaurant 
                        </Text>
                        <Text style = {[mode, styles.beginButtonText, styles.buttonEnabled ]}> 
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
class GroupsAccomadationsPage extends Component {
    constructor(props) {
        super(props);
        const {isDarkmode = false} = this.props.route.params;
        var { mode } = (this.props.route.params.isDarkmode ? styles.darkmode: styles.lightmode);
        const { navigation } = this.props;
        this.state = {
            showState: 1
        }
        console.log("Groups( isDarkmode: " + isDarkmode + ")");
        //Alert.alert( "Group Accomadations render, State: " + this.state.showState);
    };
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
        //Alert.alert( "Group Accomadations render, State: " + this.state.showState);
    }

    onInvitePressed = () => {
        console.log( "Invite Pressed");
        if( this.state.showState == 3) {
            this.setState(prevState => ({
                showState: 1
              }));
        } else {
            this.setState(prevState => ({
                showState: 3
            }));
        }
        //Alert.alert( "Group Accomadations render, State: " + this.state.showState);
    }
    render( props ) {
        this.mode  = (this.props.route.params.isDarkmode ? styles.darkmode: styles.lightmode);
        console.log( this.props.isDarkmode + " : " + this.mode);
        console.log(this.state.showState);
        return(
            <View style = {[styles.container, this.mode]}>
                <View style = {[ this.mode, styles.padding, {flex: 0.3}]} />
                <View style = {[styles.containerList, styles.lightmode, this.mode]}>
                    <Text style={[ styles.lightmode, this.mode ]}>Are you eating with friends?</Text>
                    <View style = {styles.padding}/>
                    <TouchableWithoutFeedback  title = 'Join' onPress={this.onJoinPressed}> 
                        <View style = {[ this.mode, styles.buttonFocused, (this.state.showState == 2? styles.buttonEnabled: null ) ]}>
                            <Text style = {[this.mode, styles.beginButtonText, (this.state.showState == 2? styles.buttonEnabled: null )]}> 
                                Join a Group 
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <this.showQRScanner/>
                    <View style = {styles.padding}/>
                    <TouchableWithoutFeedback  title = 'Invite' onPress={this.onInvitePressed}> 
                        <View style = {[ this.mode, styles.buttonFocused, (this.state.showState == 3? styles.buttonEnabled: null ) ]}>
                            <Text style = {[this.mode, styles.beginButtonText, (this.state.showState == 3? styles.buttonEnabled: null )]}> 
                                Invite to a Group 
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <this.showQRcode />

                    <this.showEatingAlone/>
                </View>
                <View style = {[ this.mode, styles.padding, {flex: 0.7}]} />
                <Navbar mode={[styles.lightmode, this.mode]}/>
            </View>
        );

    }
  }
  export default GroupsAccomadationsPage;