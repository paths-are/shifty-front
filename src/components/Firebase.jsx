// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import React from "react";
import Button from "@material-ui/core/Button";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
// const firebaseConfig = {
//   authDomain: "https://shifty-300613.web.app/",
//   projectId: "shifty-300613",
//   appId: "1:697184433971:web:ae89d28717b6edd9997046",
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcCzl3I6u-3ioAmES8fxs1cO75jIpIYbo",
  authDomain: "shifty-300613.firebaseapp.com",
  projectId: "shifty-300613",
  storageBucket: "shifty-300613.appspot.com",
  messagingSenderId: "697184433971",
  appId: "1:697184433971:web:ae89d28717b6edd9997046",
  measurementId: "G-HZJ8GBM1N2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Firebase = (props) => {
  return <Button variant="contained">Google Calendar 登録</Button>;
};
export default Firebase;
