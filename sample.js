const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'dt163eJ6BRGjB2h9GTdQkw3g-ZIs4Ao78gI9qBcc02haMDHYlwbLqdUNsk5fVBhZpFgF-uHdFzTiO5o_JilqYQD-IQc_pEpHe-u-ZUGmo5raqeNl4Eb6qyJI5EqwX3Yx';

// https://www.yelp.com/developers/documentation/v3/business_search for full documentation
const location = '95015'; // string

const time = (new Date('November 14, 2020 14:24:00')).getTime() / 1000; // int, UNIX timestamp
const price = "1, 2, 3"; // string, number of dollar signs, 1 = $, 2 = $$, 3 = $$$, 4 = $$$$

// See the Food and Restaurants page on https://www.yelp.com/developers/documentation/v3/all_category_list
const dietary_require = ["halal"]; // vegan, vegetarian, kosher, halal
const cuisine = ["chinese", "japanese", "korean"]; // chinese, newamerican, tradamerican, mexican, italian, japanese, korean, thai, vietnamese, indpak (Indian)...
const type = ["bbq"]; // breakfast_brunch (Breakfast & Brunch), hotdogs (Fast Food), desserts (Desserts), coffee (Coffee & Tea), bbq (Barbeque)...

const categories =  dietary_require.concat(cuisine).concat(type).join(", ");
console.log(categories);

// I don't think you can search by rating

const searchRequest = {
  location: location,
  open_at: time,
  price: price,
  categories: categories
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});
