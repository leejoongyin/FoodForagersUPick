import React from 'react';
import { Image, Text, View, TouchableWithoutFeedback } from 'react-native';
import styles from '../style/styles';
import '../assets/McDonalds.png'//logo from './assets/mcds.jpg'

export default class RestaurantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
    };
    this.isDarkmode = this.props.isDarkmode;

    this.getStoredData();

  }
  getStoredData = async () => {
    await this.getData('restaurant_name').then((result) => {
      this.setState({name: result});
    });
    await this.getData('image').then((result) => {
      this.setState({image: result});
    });
    await this.getData('location').then((result) => {
      this.setState({location: result});
    });
    await this.getData('url').then((result) => {
      this.setState({url: result});

    });
    await this.getData('phone').then((result) => {
      this.setState({phone: result});
      this.setState({loading: false});
    });
  }
  getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key).then((key) => {return key;})
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
      // read error
      alert('error: ', e);
    }
    console.log('Done.')
  }
  openMenu = () => {
    Linking.canOpenURL(this.state.url).then((supported) => {
      if (supported) {
        Linking.openURL(this.state.url);
      } else {
        alert(
          "Cannot Open the link!",
          "The webpage seems to be offline at the moment.",
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
    });
  }
  render() {
    var isDarkmode = props.route.params.isDarkmode;
    var mode = (isDarkmode?styles.darkmode:styles.lightmode);
    var mode2 = (isDarkmode?styles.darkmode2:styles.lightmode2);
    var buttonColor = (isDarkmode?styles.buttonColor1Dark:styles.buttonColor1);

    return (
      <View style = {[styles.resInfoScreen]}>
      <View style={[ styles.mainViewer, mode ]}>
        <View style={[styles.resInfoPadding]}/>
        <Text style={[ mode2, { fontSize: 25 }]}>Let's go to:</Text>
        <Text style={[ mode, { fontSize: 45, fontWeight: 'bold'} ]}>McDonald's</Text>
        <View style={[styles.resInfoPadding]}/>
        <Image
          source={require('../assets/McDonalds.png')}
          style={[styles.resInfoRestaurauntImage]}
        />
        <View style={[styles.resInfoPadding]}/>
        <View style={[styles.resInfoRow]}>
          <Text style={[styles.resInfoTextStyle, mode2, {fontWeight: "bold"}]}>Hours: </Text>
          <Text style={[styles.resInfoTextStyle, mode2, {fontWeight: "bold", fontStyle: 'italic'}]}>Open Now </Text>
          <Text style={[styles.resInfoTextStyle, mode2]}> until 7pm </Text>
        </View>
        <View style={[styles.resInfoPaddingline]}/>
        <View style={[styles.resInfoRow]}>
          <Text style={[styles.resInfoTextStyle, mode2, {fontWeight: "bold"}]}>Location: </Text>
          <Text style={[styles.resInfoTextStyle, mode2 ]}>1234 Street Ave. City, ST 91234</Text>
        </View>
        <View style={[styles.resInfoPaddingline]}/>
        <View style={[styles.resInfoRow]}>
          <Text style={[styles.resInfoTextStyle, mode2, {fontWeight: "bold"}]}>Phone Number: </Text>
          <Text style={[styles.resInfoTextStyle, mode2 ]}>123-123-1234</Text>
        </View>
  
        <View style={[styles.resInfoPaddingline]}/>
        <View style={[styles.resInfoPaddingline]}/>
        <View style={[styles.resInfoPaddingline]}/>
        <View style={[styles.resInfoPaddingline]}/>
  
        <View style={[styles.resInfoRow]}>
            <TouchableWithoutFeedback
              onPress={() => alert('Menu!')}
              style={[styles.resInfoButton]}
            >
              <View style = {[ mode, styles.resInfoButton, buttonColor ]}>
                <Text style={[styles.buttonText, buttonColor]}>View Menu</Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={[styles.resInfoButtonGap]}/>
            <TouchableWithoutFeedback
              onPress={() => alert('Call!')}
              style={[styles.resInfoButton]}
            >
              <View style = {[ mode, styles.resInfoButton, buttonColor ]}>
                <Text style={[styles.buttonText, buttonColor]}>Call Now</Text>
              </View>
            </TouchableWithoutFeedback>
        </View>
        <View style={[styles.resInfoPaddingBottom]}/>
      </View>
    </View>
    );
  }
}