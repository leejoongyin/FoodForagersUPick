
import db from '../base';

export default class dbController {
  static async updateDBOnJoin(ref, zipcode, time, budgetArray, dietArray, cuisineArray, restaurantArray) {
    var firebaseRef = db.database().ref(ref);
    var timelocation = {};
    timelocation['Zipcode'] = zipcode;
    timelocation['Time'] = time;
    firebaseRef.update(timelocation);

    await firebaseRef.child('Members').once('value').then((snapshot) => {
      var updates = {};
      updates['Members'] = (parseInt(snapshot.val()) + 1);
      firebaseRef.update(updates);
    });

    await firebaseRef.child('Budget').once('value').then((snapshot) => {
      var updates = {};
      var temp = 0;
        for (let budget of budgetArray) {
          if (budget === '$') {
            temp = 0;
            if (snapshot.child('1').val()) {
              temp = parseInt(snapshot.child('1').val());
            }
            updates['/Budget/1/'] = (temp + 1);
          }
          if (budget === '$$') {
            temp = 0;
            if (snapshot.child('2').val()) {
              temp = parseInt(snapshot.child('2').val());
            }
            updates['/Budget/2/'] = (temp + 1);
          }
          if (budget === '$$$') {
            temp = 0;
            if (snapshot.child('3').val()) {
              temp = parseInt(snapshot.child('3').val());
            }
            updates['/Budget/3/'] = (temp + 1);
          }
        firebaseRef.update(updates);
      }
    });
    await firebaseRef.child('Diet').once('value').then((snapshot) => {
      var updates = {};
      var temp = 0;
      for (let diet of dietArray) {
        temp = 0;
        if (snapshot.child(diet).val()) {
          temp = parseInt(snapshot.child(diet).val());
        }
        updates['/Diet/' + diet] = (temp + 1);
        //console.log("diet: " + diet + " " + (temp+1) + '\n');
      }
      firebaseRef.update(updates);

    });
    await firebaseRef.child('Cuisine').once('value').then((snapshot) => {
      var updates = {};
      var temp = 0;
      for (let cuisine of cuisineArray) {
        temp = 0;
        if (snapshot.child(cuisine).val()) {
          temp = parseInt(snapshot.child(cuisine).val());
        }
        updates['/Cuisine/' + cuisine] = (temp + 1);
        //console.log("cuisine: " + cuisine + " " + (temp+1) + '\n');
      }
      firebaseRef.update(updates);
    });
    await firebaseRef.child('Restaurant').once('value').then((snapshot) => {
      var updates = {};
      var temp = 0;
      for (let restaurant of restaurantArray) {
        temp = 0;
        if (snapshot.child(restaurant).val()) {
          temp = parseInt(snapshot.child(restaurant).val());
        }
        updates['/Restaurant/' + restaurant] = (temp + 1);
        //console.log("restaurant: " + restaurant + " " + (temp+1) + '\n');
      }
      firebaseRef.update(updates);
    });
    firebaseRef.off();
  }

  static async createDBEntry(code, zipcode, time, budgetArray, dietArray, cuisineArray, restaurantArray) {
    var firebaseRef = db.database().ref(code);
    firebaseRef.remove();
    var updates = {};

    updates['Members'] = 1;
    updates['Zipcode'] = zipcode;
    updates['Time'] = time;

    for (let budget of budgetArray) {
      if (budget === '$') {updates['/Budget/1/'] = 1;}
      if (budget === '$$') {updates['/Budget/2/'] = 1;}
      if (budget === '$$$') {updates['/Budget/3/'] = 1;}
    }

    for (let diet of dietArray) {
      updates['/Diet/' + diet] = 1;
    }

    for (let cuisine of cuisineArray) {
      updates['/Cuisine/' + cuisine] = 1;
    }

    for (let restaurant of restaurantArray) {
      updates['/Restaurant/' + restaurant] = 1;
    }

    firebaseRef.update(updates);
    firebaseRef.off();
  }

  static async updateDBOnExit(ref, zipcode, time, budgetArray, dietArray, cuisineArray, restaurantArray) {
    var firebaseRef = db.database().ref(ref);

    await firebaseRef.child('Budget').once('value').then((snapshot) => {
      var updates = {};
      var temp = 0;
      for (let budget of budgetArray) {
        if (budget === '$') {
          temp = 0;
          if (snapshot.child('1').val()) {
            temp = parseInt(snapshot.child('1').val());
          }
          updates['/Budget/1/'] = (temp - 1);
        }
        if (budget === '$$') {
          temp = 0;
          if (snapshot.child('2').val()) {
            temp = parseInt(snapshot.child('2').val());
          }
          updates['/Budget/2/'] = (temp - 1);
        }
        if (budget === '$$$') {
          temp = 0;
          if (snapshot.child('3').val()) {
            temp = parseInt(snapshot.child('3').val());
          }
          updates['/Budget/3/'] = (temp - 1);
        }
        firebaseRef.update(updates);
      }
    });
    await firebaseRef.child('Diet').once('value').then((snapshot) => {
      var updates = {};
      var temp = 0;
      for (let diet of dietArray) {
        temp = 0;
        if (snapshot.child(diet).val()) {
          temp = parseInt(snapshot.child(diet).val());
        }
        updates['/Diet/' + diet] = (temp - 1);
        //console.log("diet: " + diet + " " + (temp-1) + '\n');
      }
      firebaseRef.update(updates);
    });
    await firebaseRef.child('Cuisine').once('value').then((snapshot) => {
      var updates = {};
      var temp = 0;
      for (let cuisine of cuisineArray) {
        temp = 0;
        if (snapshot.child(cuisine).val()) {
          temp = parseInt(snapshot.child(cuisine).val());
        }
        updates['/Cuisine/' + cuisine] = (temp - 1);
        //console.log("cuisine: " + cuisine + " " + (temp-1) + '\n');
      }
      firebaseRef.update(updates);
    });
    await firebaseRef.child('Restaurant').once('value').then((snapshot) => {
      var updates = {};
      var temp = 0;
        for (let restaurant of restaurantArray) {
          temp = 0;
          if (snapshot.child(restaurant).val()) {
            temp = parseInt(snapshot.child(restaurant).val());
          }
          updates['/Restaurant/' + restaurant] = (temp - 1);
          //console.log("restaurant: " + restaurant + " " + (temp-1) + '\n');
        }
        firebaseRef.update(updates);
    });
    firebaseRef.off();
  }

  static async getGroupCode(filteredInput) {
    var firebaseRef, val;
    if (filteredInput === "") {
        firebaseRef = db.database().ref("not valid");
    } else {
        firebaseRef = db.database().ref(filteredInput);
    }

    await firebaseRef.child('Members').once('value').then((snapshot) => {
      val = snapshot.val();
      firebaseRef.off();
    });

    return val;
  }

  static async parseSearch(ref) {
    var numBudget; // numerical value corresponding to each '$...' symbol
    var filter;
    var bnbChosen = false;
    var maxVal = 0;
    var index = 0;
    let cat = [];

    const bChoices = ["1","2","3"];
    const dChoices = ["Vegan", "Vegetarian", "Kosher", "Halal", "Gluten free"];
    const cChoices = ["Chinese","American","Mexican","Italian","Japanese","Korean",
            "Thai", "Vietnamese", "Indian"];
    const rChoices = ["Breakfast","Brunch","Bars","Fast Food","Dessert",
            "Bubble tea", "Coffee Shops", "BBQ"];

    let bArray = [];
    let dArray = [];
    let cArray = [];
    let rArray = [];

    var firebaseRef = db.database().ref(ref);

    await firebaseRef.child('Budget').once('value').then((snapshot) => {
        maxVal = 0;
        index = 0;
        if (snapshot.exists()) {
            for (let budget of bChoices) {
                if (snapshot.child(budget).exists()) {
                    if (parseInt(snapshot.child(budget).val()) >= maxVal && parseInt(snapshot.child(budget).val()) !== 0) {
                        if (parseInt(snapshot.child(budget).val()) > maxVal) {
                            bArray = [];
                            index = 0;
                        }
                        maxVal = parseInt(snapshot.child(budget).val());
                        bArray[index] = budget;
                        index++;
                    }
                }
            }
        }
    });

    await firebaseRef.child('Diet').once('value').then((snapshot) => {
        maxVal = 0;
        index = 0;
        if (snapshot.exists()) {
            for (let diet of dChoices) {
                if (snapshot.child(diet).exists()) {
                    if (parseInt(snapshot.child(diet).val()) >= maxVal && parseInt(snapshot.child(diet).val()) !== 0) {
                        if (parseInt(snapshot.child(diet).val()) > maxVal) {
                            dArray = [];
                            index = 0;
                        }
                        maxVal = parseInt(snapshot.child(diet).val());
                        dArray[index] = diet;
                        index++;
                    }
                }
            }
            // diet
            for (var i = 0; i < dArray.length; i++) {
                var temp = dArray[i].toLowerCase();

                if (temp === "gluten free") {temp = "gluten_free";}

                cat.push(temp);
                console.log("diet: " + temp);
            }
        }
    });

    await firebaseRef.child('Cuisine').once('value').then((snapshot) => {
        maxVal = 0;
        index = 0;
        if (snapshot.exists()) {
            for (let cuisine of cChoices) {
                if (snapshot.child(cuisine).exists()) {
                    if (parseInt(snapshot.child(cuisine).val()) >= maxVal && parseInt(snapshot.child(cuisine).val()) !== 0) {
                        if (parseInt(snapshot.child(cuisine).val()) > maxVal) {
                            cArray = [];
                            index = 0;
                        }
                        maxVal = parseInt(snapshot.child(cuisine).val());
                        cArray[index] = cuisine;
                        index++;
                    }
                }
            }
            // cuisine
            for (var i = 0; i < cArray.length; i++) {
                var temp = cArray[i].toLowerCase();

                if (temp === "indian") {temp = "indpak"}
                if (temp === "american") {temp = "tradamerican"}

                cat.push(temp);
                console.log("cuisine: " + temp);
            }
        }
    });

    await firebaseRef.child('Restaurant').once('value').then((snapshot) => {
        maxVal = 0;
        index = 0;
        if (snapshot.exists()) {
            for (let restaurant of rChoices) {
                if (snapshot.child(restaurant).exists()) {

                    if (parseInt(snapshot.child(restaurant).val()) >= maxVal && parseInt(snapshot.child(restaurant).val()) !== 0) {
                        if (parseInt(snapshot.child(restaurant).val()) > maxVal) {
                            cArray = [];
                            index = 0;
                        }
                        maxVal = parseInt(snapshot.child(restaurant).val());
                        rArray[index] = restaurant;
                        index++;
                    }
                }
            }
            // restaurant type
            for (var i = 0; i < rArray.length; i++) {
                var temp = rArray[i].toLowerCase();

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
                console.log("restaurant: " + temp);
            }
        }
        filter = cat.join(',');
        console.log(`filter is ${filter}`);
    });
    return [filter, bArray];
  }

  static async removeMember(ref, zipcode, time, budgetArray, dietArray, cuisineArray, restaurantArray) {
    var firebaseRef = db.database().ref(ref);

    firebaseRef.child('Members').once('value').then((snapshot) => {
        var updates = {};
        updates['Members'] = (parseInt(snapshot.val()) - 1);
        firebaseRef.update(updates);

        firebaseRef.child('Members').once('value').then((snapshot) => {
            this.updateDBOnExit(ref, zipcode, time, budgetArray, dietArray, cuisineArray, restaurantArray).then(() => {
                console.log(`There are ${snapshot.val()} members`);
                if (parseInt(snapshot.val()) < 1) {
                    firebaseRef.remove();
                }
            });
        });
    });
  }
}
