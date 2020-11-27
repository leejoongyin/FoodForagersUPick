import { View, Text } from 'react-native';

import React, {Component} from 'react';
import QRCode from 'react-native-qrcode-svg';


import './Navbar';
import Navbar from './Navbar';
import styles from './styles';

class NextPage extends Component {
    constructor(props) {
        super(props);
        var { mode } = (this.props.route.params.isDarkmode ? styles.darkmode: styles.lightmode);
    }

    render( props ) {
        this.mode  = (this.props.route.params.isDarkmode ? styles.darkmode: styles.lightmode);
        console.log( this.props.isDarkmode + " : " + this.mode);
        return(
            <View style = {[styles.container, this.mode]}>
                <View style = {[styles.mainViewer, styles.lightmode, this.mode]}>
                    <Text style={[ styles.lightmode, this.mode ]}>Placeholder</Text>
                </View>
                <Navbar isDarkmode={this.props.route.params.isDarkmode}/>
            </View>
        );

    }
  }

  export default NextPage;