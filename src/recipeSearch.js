import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import Papa from 'papaparse';
// import fs from 'fs'
import { FlatList, Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Linking} from 'react-native';
// import myDataset from '../data/RAW_recipes.csv';
// // import STree from '@jayrbolton/suffix-tree';

import { getRecipesAction } from "./model/RecipeSearchAction";
import styles from '../style/styles';


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
      let link = getRecipesAction(query);
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

    return (
      <View style={[ styles.recipeSearchContainer, mode]}>
        <Text style={[styles.recipeCenterHeader, mode ]}>Enter a meal/cuisine that you'd like a recipe for:</Text>
        <TextInput
          onSubmitEditing= { (event) => this.getSearchQuery(event.nativeEvent.text) }
          placeholder="ie hotdogs, pizza, lasagna, etc."
          style={styles.recipeInputBox}
        />
        <Text style={[styles.recipeSubHeader, mode ]}>Recipe Suggestions:</Text>
        <TouchableWithoutFeedback 
          title="foodSuggestion1"
          onPress={(e) => this.getSearchQuery("Baked Potato")}>
            <View style={styles.recipeSuggestBtn}><Text style={styles.recipeSuggestBtnText}>Baked Potato</Text></View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          title="foodSuggestion2"
          onPress={(e) => this.getSearchQuery("Venison Burgers")}>
            <View style={styles.recipeSuggestBtn}><Text style={styles.recipeSuggestBtnText}>Venison Burgers</Text></View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          title="foodSuggestion3"
          onPress={(e) => this.getSearchQuery("Apple Pie")}>
            <View style={styles.recipeSuggestBtn}><Text style={styles.recipeSuggestBtnText}>Apple Pie</Text></View>
        </TouchableWithoutFeedback>        
      </View>
    );
  }
};