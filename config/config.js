import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDwG0mlHqjz_N-ZK6fPFjXIbGOqKXxpPM8",
  authDomain: "instagram-36726.firebaseapp.com",
  databaseURL: "https://instagram-36726.firebaseio.com",
  projectId: "instagram-36726",
  storageBucket: "instagram-36726.appspot.com",
  messagingSenderId: "1005182760338",
  appId: "1:1005182760338:web:ea5b44a9b10b7c72"
};

firebase.initializeApp(firebaseConfig);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
