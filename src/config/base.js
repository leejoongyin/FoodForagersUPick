import firebase from "firebase";

var db;

if (!firebase.apps.length) {
    db = firebase.initializeApp({
        apiKey: "AIzaSyAHY5z61eVgpi4yylBvuqWfq9hD5Vp4SQY",
        authDomain: "upickproject.firebaseapp.com",
        databaseURL: "https://upickproject.firebaseio.com",
        projectId: "upickproject",
        storageBucket: "upickproject.appspot.com",
        messagingSenderId: "465009955587",
        appId: "1:465009955587:web:d80f20b66f9ea47d348f36"
    });
 }else {
    db = firebase.app(); 
 }

export default db; 