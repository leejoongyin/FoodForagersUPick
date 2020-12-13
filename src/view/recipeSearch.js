import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import Papa from 'papaparse';
// import fs from 'fs'
import { FlatList, Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Linking} from 'react-native';
// import myDataset from '../data/RAW_recipes.csv';
// // import STree from '@jayrbolton/suffix-tree';

import localController from "../controller/localController";
import colors from '../style/colors';


export default class RecipeSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      isLoading: true,
      recipes: [],
      recipeCount: 0,
    };
    this.getSearchQuery = this.getSearchQuery.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.recipe ) {
      this.setState({
        recipes: this.props.recipeSearch.recipe.hits,
        recipeCount: this.props.recipeSearch.recipe.count,
      });
    }
  }

  getSearchQuery = (query) => {
    if (query && query.length) {
      this.setState({
        searchQuery: query,
      });
      // console.log(getRecipesAction(query));
      let link = localController.searchRecipe(query);
      // console.log(link);
      // return this.gotoSourceWebsite(link);
    } else {
      this.setState({
        recipes: [],
      });
      console.log("I occur");
    }
  };

  // gotoSourceWebsite = (url) => {
  //   Linking.canOpenURL(url).then((supported) => {
  //     if (supported) {
  //       console.log(url);
  //       Linking.openURL(url);
  //     } else {
  //       alert(
  //         "Cannot Open the link !",
  //         "The wepage seems to be offline at the moment.",
  //         [{ text: "OK" }],
  //         { cancelable: false }
  //       );
  //     }
  //   });
  // };

  // goToRecipe = (recipe) => {
  //   let data = this.props.route.params.recipeData.recipe;
  //   this.gotoSourceWebsite(data.url);
  //   // this.props.navigation.navigate("./showRecipe.js", { recipeData: recipe });
  // };

  render() {
    var isDarkmode = this.props.route.params.isDarkmode;
    var mode = (isDarkmode?styles.darkmode:styles.lightmode);
    var buttonColor = (isDarkmode?styles.buttonColor1Dark:styles.buttonColor1);

    return (
      <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', margin: 'auto', marginBottom: 50 },mode]}>
        <Text style={[styles.centerHeader, mode ]}>Enter a meal/cuisine that you'd like a recipe for:</Text>
        <TextInput
          onSubmitEditing= { (event) => this.getSearchQuery(event.nativeEvent.text) }
          placeholder="ie hotdogs, pizza, lasagna, etc."
          style={styles.inputBox}
        />
        <Text style={[styles.subHeader, mode ]}>Recipe Suggestions:</Text>
        <TouchableWithoutFeedback
          title="foodSuggestion1"
          onPress={(e) => this.getSearchQuery("Baked Potato")}>
            <View style={styles.suggestBtn}><Text style={{color: '#6B222D'}}>Baked Potato</Text></View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          title="foodSuggestion2"
          onPress={(e) => this.getSearchQuery("Venison Burgers")}>
            <View style={styles.suggestBtn}><Text style={{color: '#6B222D'}}>Venison Burgers</Text></View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          title="foodSuggestion3"
          onPress={(e) => this.getSearchQuery("Apple Pie")}>
            <View style={styles.suggestBtn}><Text style={{color: '#6B222D'}}>Apple Pie</Text></View>
        </TouchableWithoutFeedback>


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
  inputBox: {
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
  submitBtn: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#6B222D',
    color: '#FFF',
    borderRadius: 8,
    width: 100,
    height: 36
  },
  suggestBtn: {
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
  button: {
      padding: 5,
      marginTop: 5,
      marginBottom: 5,
      height: 36,
      width: '30%',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
  },
  buttonText: {
      textAlign: 'center',
      fontSize: 12
  },
  answers: {
      width: '80%',
      alignSelf: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
      flexDirection: 'row',
      flexWrap: 'wrap'
  },
  header: {
    width: '80%',
    textAlign: 'left',
    color: '#6B222D',
    fontSize: 14
  },
  centerHeader: {
    width: '80%',
    textAlign: 'center',
    color: '#6B222D',
    fontSize: 14
  },
  subHeader: {
    width: '80%',
    height: '5%',
    textAlign: 'center',
    color: '#6B222D',
    fontSize: 14
  }
});

// const mapStateToProps = (state) => ({
//   recipeSearch: {
//     recipe: state.recipeSearchReducer.recipe,
//     loading: state.recipeSearchReducer.loading,
//     error: state.recipeSearchReducer.error,
//   },
// });


// export default connect(mapStateToProps, null)(recipeSearch);
