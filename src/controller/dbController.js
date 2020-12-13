
import db from '../base';

export default class dbController {
  static async updateDB(filteredInput, zipcode, time, budgetArray, dietArray, cuisineArray, restaurantArray) {
    var firebaseRef = db.database().ref(filteredInput);
    var timelocation = {};
    timelocation['Zipcode'] = zipcode;
    timelocation['Time'] = time;
    firebaseRef.update(timelocation);

    await firebaseRef.child('Members').once('value').then((snapshot) => {
        var updates = {};
        updates['Members'] = (parseInt(snapshot.val()) + 1);
        firebaseRef.update(updates);
    })

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
}
