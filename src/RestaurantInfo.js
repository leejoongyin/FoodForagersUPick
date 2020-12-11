import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { Image, StyleSheet, Text, View, TouchableWithoutFeedback, Dimensions } from 'react-native';
import '../assets/McDonalds.png'//logo from './assets/mcds.jpg'
import colors from '../style/colors';
import {SCALING_WIDTH, MODULE_WIDTH, MODULE_RADIUS} from '../style/styles';
import localController from './controller/localController'
import {Linking} from 'react-native';

const restaurauntImage = '../assets/splash.png';


export default class RestaurantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
    };
    this.isDarkmode = this.props.isDarkmode;

    this.getStoredData().then(() => this.setState({loading: false}));

  }

  getStoredData = async () => {
    await localController.getData('restaurant_name').then((result) => {
      this.setState({name: result});
    });
    await localController.getData('image').then((result) => {
      this.setState({image: result});
    });
    await localController.getData('location').then((result) => {
      this.setState({location: result});
    });
    await localController.getData('url').then((result) => {
      this.setState({url: result});
    });
    await localController.getData('phone').then((result) => {
      this.setState({phone: result});
    });
  }

  openMenu = () => {
    Linking.canOpenURL(this.state.url).then((supported) => {
      if (supported) {
        Linking.openURL(this.state.url);
      } else {
        alert(
          "We couldn't open your web browser!",
          `${this.state.url}`
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
    });
  }

  callNumber = () => {
    Linking.canOpenURL(`tel:${this.state.phone}`).then((supported) => {
      if (supported) {
        Linking.openURL(`tel:${this.state.phone}`);
      } else {
        alert(
          "We couldn't open your phone application!",
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
    });
  }

  render() {
    var isDarkmode = this.props.route.params.isDarkmode;
    var mode = (isDarkmode?styles.darkmode:styles.lightmode);
    var mode2 = (isDarkmode?styles.darkmode2:styles.lightmode2);
    var buttonColor1= (isDarkmode?styles.buttonColor1Dark:styles.buttonColor1);

    return (
    <View style = {[styles.screen]}>
      {!this.state.loading && (
      <View style={[ styles.mainViewer, mode ]}>
        <View style={[styles.padding]}/>
        <Text style={[ mode2, { fontSize: 25 }]}>Let's go to:</Text>
        <Text style={[ mode, { fontSize: 45, fontWeight: 'bold', textAlign: 'center'} ]}>{this.state.name}</Text>
        <View style={[styles.padding]}/>
        <Image
          source={{uri: this.state.image}}
          style={[styles.restaurauntImage]}
        />
        <View style={[styles.padding]}/>
        <View style={[styles.paddingLine]}/>
        <View style={[styles.infoRow]}>
          <Text style={[styles.textStyle_2, mode2, {fontWeight: "bold"}]}>Location: </Text>
          <Text style={[styles.textStyle_2, mode2 ]}>{this.state.location}</Text>
        </View>
        <View style={[styles.paddingLine]}/>
        <View style={[styles.infoRow]}>
          <Text style={[styles.textStyle_2, mode2, {fontWeight: "bold"}]}>Phone Number: </Text>
          <Text style={[styles.textStyle_2, mode2 ]}>{this.state.phone}</Text>
        </View>

        <View style={[styles.paddingLine]}/>
        <View style={[styles.paddingLine]}/>

        <View style={[styles.infoRow]}>
            <View style={[styles.button, buttonColor1]}>
              <TouchableWithoutFeedback onPress={this.openMenu}>
                <Text style={[styles.buttonText, buttonColor1]}>View Menu</Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={[styles.buttonGap]}/>
            <View style={[styles.button, buttonColor1]}>
              <TouchableWithoutFeedback onPress={this.callNumber}>
                <Text style={[styles.buttonText,buttonColor1]}>Call Now</Text>
              </TouchableWithoutFeedback>
            </View>
        </View>
        <View style={[styles.paddingBottom]}/>
      </View>)}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  lightmode: {
    backgroundColor: colors.liteBG,
    color: colors.accentPrim,
    borderColor: '#555555'
  },
  darkmode: {
    backgroundColor: colors.darkBG,
    color: 'white',
    borderColor: '#cccccc'
  },
  lightmode2: {
    backgroundColor: colors.liteBG,
    color: 'black',
  },
  darkmode2: {
    backgroundColor: colors.darkBG,
    color: colors.liteBG,
  },
  buttonColor1: {
    backgroundColor: colors.accentPrim,
    color: 'white',
  },
  buttonColor1Dark: {
    backgroundColor: colors.accentPrimDark,
    color: colors.accentPrim,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  paddingLine: {
    flex: 0.1,
    width: 20,
    height: '3%',
  },
  padding: {
    flex: 0.5,
    width: 20,
    height: '10%',
  },
  paddingBottom: {
    flex: 2,
    width: '5%',
    height: '15%',
  },
  navBar: {
    backgroundColor: '#404040',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },

  textStyle: {
    color: '#99CCFF',
    fontSize: 45,
  },

  textStyle_2: {
    color: '#EEEEEE',
    fontSize: 18
  },

  textStyle_3: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',

  },

  box1: {
    width: '100%',
    backgroundColor: '#202020',
  },

  box2: {
  },

  box3: {
    width: '100%',
  },

  container: {
    backgroundColor: '#477979',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    borderWidth: 0
  },

  mainViewer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 5
  },

  container_2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flex: 1,
    padding: 5
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 0,
    //flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    width: MODULE_WIDTH,
    alignContent: 'center',
    justifyContent: 'flex-start'
  },

  infoContentText: {
    fontSize: 20

  },

  button: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#999999',
    padding: 0,
    height: 50,
    borderRadius: MODULE_RADIUS,
    borderWidth: 0,
    width: 0.40*SCALING_WIDTH,
  },

  buttonGap: {
    width: 0.05*SCALING_WIDTH,
    flex: 1,
  },

  outline: {
    borderWidth: 5,
    borderColor: 'red',
    backgroundColor: 'blue',
  },
  restaurauntImage: {
    width: MODULE_WIDTH,
    height: '30%',
    borderRadius: MODULE_RADIUS,
    resizeMode: 'cover',
  },

  screen: {
    width: '100%',
    flex: 1,
    alignContent: 'flex-start',
    flexDirection: 'column'
  }

});
