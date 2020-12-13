import KEYS from "../config/keys.json";
import Ajax from "./ajax";
import React, {Component, useState} from 'react';
import {Linking} from 'react-native';

let ajax = new Ajax();

export const getRecipesAction = (query, from, to) => {
    // return (dispatch) => {
      // console.log(getRecipes(query, from, to));
      getRecipes(query, from, to)
        .then((response) => {;
          console.log("Success");
          // console.log(response)
          let url = response.data.hits[0].recipe.url;
          Linking.canOpenURL(url).then((supported) => {
            if (supported) {
              // console.log(url);
              Linking.openURL(url);
            } else {
              alert(
                "Cannot Open the link !",
                "The wepage seems to be offline at the moment.",
                [{ text: "OK" }],
                { cancelable: false }
              );
            }
          });
          return;
        })
        .catch((error) => {
          console.log("Error with contacting Edamam API");
          console.log(error);
          return;
        });
    // };
  };

  const getRecipes = (searchQuery, from = 0, to = 60) => {
    let query = {
      q: searchQuery,
      app_id: KEYS.recipe_search.app_id,
      app_key: KEYS.recipe_search.app_key,
      from,
      to,
    };
    // console.log(searchQuery);
    // let request = fetch("https://api.edamam.com/search", {
    //   method: "GET",
    //   params: { ...query },
    //   data: {},
    // });
    // return request
    return ajax.makeRequest("https://api.edamam.com/search", "GET", { ...query }, {});
  };
