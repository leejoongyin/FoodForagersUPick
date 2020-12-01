//import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
//import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import Navbar from './Navbar';
import colors from '../style/colors';
export default class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      restaurantListArray: ["Liuli Pavilion", "Cat's Tail Tavern", "Wanmin Restaurant", "Dawn Winery", "Yansheng Teahouse"],
      userInput: '',
    };
  }

  handleText = (text) =>{
    this.setState({userInput: text})
    /*alert(this.state.userInput)*/
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      /* e.preventDefault(); */
      if(this.state.userInput != '') {
        const joined = this.state.restaurantListArray.concat(this.state.userInput);
        this.setState({restaurantListArray: joined }); 
        this.setState({userInput: ''});
      }
    }
  }
  
  getRestaurantList() {
    var list = this.state.restaurantListArray;
    return list.join('\n');
  }

  pressHandler = (item) => {
    const filter = this.state.restaurantListArray.filter(index => index != item)
    this.setState({restaurantListArray: filter});
  }

  submit = () => {
    this.props.navigation.navigate('Group Accommodations');
  }
  // TODO: Replace hardcoded colors with light mode/dark mode
  render() {
    
    var isDarkmode = this.props.route.params.isDarkmode;
    var mode = (isDarkmode ? styles.darkmode: styles.lightmode );

    return (
      <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 'auto', width: '100%'},mode]}>
        <Text style={[{padding: 10, fontSize: 20, color: '#6b222d', textAlign: 'center'},mode]}>
          {"Enter the restaurants you are deciding between:"}
        </Text>
        <TextInput value={this.state.userInput} 
          /*defaultValue = {this.state.restaurantListArray}*/
          onFocus={() => this.setState({isFocused: true})}
          style={{height: 40, paddingLeft: 10, width: '85%', backgroundColor: 'white', borderRadius: 5}}
          fontStyle={this.state.isFocused ? 'normal' : 'italic'}
          placeholder={this.state.isFocused ? "" : "Type restaurants here and hit enter to add to list"}   
          onChangeText={this.handleText}
          onKeyPress={this.handleKeyPress} 
          
        />
        <View style={[{width: '85%', height: '50%'},mode]}>
          <ScrollView style={{ marginTop: 10, marginBottom: 10,  backgroundColor: 'white', borderRadius: 5}}>           
            {this.state.restaurantListArray.map((item) => {
              return(
                /*<TouchableOpacity onPress={() => this.pressHandler(item)}>*/
                  <View style={styles.viewItem}> 
                    <Text style={styles.textItem}>{item}</Text> 
                    <View style = {{flexDirection: 'row-reverse'}}> 
                      <View style={{width: 15}}/>  
                      <TouchableOpacity onPress={() => this.pressHandler(item)}>                               
                        <AntDesign name='delete' size={20}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                /*</TouchableOpacity>*/
              )            
            })}                  
          </ScrollView>
        </View>
        <TouchableOpacity style={[{backgroundColor: '#6b222d', width: '85%', borderRadius: 5, marginBottom: 100}, (isDarkmode?styles.buttonColor1Dark:styles.buttonColor1)]} onPress={this.submit}>
          <View style = {{borderRadius: 10, marginTop: 10, marginBottom: 10 }}>
            <Text style={[{ fontSize: 20, textAlign: 'center', color: '#ffffff'},(isDarkmode?styles.buttonColor1Dark:styles.buttonColor1)]}>Submit</Text>
          </View>
        </TouchableOpacity>
        <Navbar isDarkmode={this.props.route.params.isDarkmode} navigation={this.props.navigation}/>
      </View>
    );
  }
};

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
  buttonColor1: {
    backgroundColor: colors.accentPrim,
    color: 'white',
  },
  buttonColor1Dark: {
    backgroundColor: colors.accentPrimDark,
    color: colors.accentPrim,
  },

  textItem: {
    padding: 10,
    fontSize: 22, 
  },

  viewItem:{
    //backgroundColor:'#E2D6C8',
    margin:5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

});