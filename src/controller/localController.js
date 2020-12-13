import AsyncStorage from '@react-native-async-storage/async-storage';
import valZip from '../model/validateZip';
import { getRecipesAction } from '../model/RecipeSearchAction';

export default class localController {
  static async storeData(key,value) {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key,jsonValue).then(() => console.log(`localController.js: Stored {${key}: ${jsonValue}}`));
    } catch (e) {
      console.log(`Error storing data!\n${e}`)
    }
  }

  static async getData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key).then((key) => {
        return key;
      });
      return jsonValue ? JSON.parse(jsonValue) : null
    } catch(e) {
      console.log(`Error reading data!\n${e}`)
    }
  }

  static validateZip(zipcode) { return valZip(zipcode) }

  static searchRecipe(query) { return getRecipesAction(query)}

  static parseSearch(budgetArray, dietArray, cuisineArray, restaurantArray) {
    var numBudget; // numerical value corresponding to each '$...' symbol
    var filter;
    var bnbChosen = false;
    let cat = [];
    let budget = [];

    // budget
    for (var i = 0; i < budgetArray.length; i++) {
        if (budgetArray[i] == '$') {
            numBudget = '1';
        }
        if (budgetArray[i] == '$$') {
            numBudget = '2';
        }
        if (budgetArray[i] == '$$$') {
            numBudget = '3';
        }
        budget.push(numBudget);
    }

    // diet
    for (var i = 0; i < dietArray.length; i++) {

        var temp = dietArray[i].toLowerCase();

        if (temp === "gluten free") {temp = "gluten_free";}

        cat.push(temp);
        console.log("diet: " + temp + '\n');
    }

    // cuisine
    for (var i = 0; i < cuisineArray.length; i++) {

        var temp = cuisineArray[i].toLowerCase();

        if (temp === "indian") {temp = "indpak"}
        if (temp === "american") {temp = "tradamerican"}

        cat.push(temp);
        console.log("cuisine: " + temp + '\n');
    }

    // restaurant type
    for (var i = 0; i < restaurantArray.length; i++) {

        var temp = restaurantArray[i].toLowerCase();

        if ((temp === "breakfast" || temp === "brunch")) {
            if (!bnbChosen) {
                temp = "breakfast_brunch";
                bnbChosen = true;
            } else {
                temp = null;
            }
        }
        if (temp === "fast food") {temp = "hotdogs"}
        if (temp === "dessert") {temp = "desserts"}
        if (temp === "bubble tea") {temp = "bubbletea"}
        if (temp === "coffee shops") {temp = "coffee"}

        if (temp) {cat.push(temp);}
        console.log("restaurant: " + temp + '\n');
    }

    // prioritize diet restrictions since categories is: this,that = "this OR that"

    filter = cat.join(',');

    return [filter, budget];
  }
}
