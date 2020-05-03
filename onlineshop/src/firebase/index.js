import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyBGx8su_j6izsW7airl12pRqBN2y-cpWi0",
    authDomain: "onlineshop-faa88.firebaseapp.com",
    databaseURL: "https://onlineshop-faa88.firebaseio.com",
    projectId: "onlineshop-faa88",
    storageBucket: "onlineshop-faa88.appspot.com",
    messagingSenderId: "46654671141",
    appId: "1:46654671141:web:e5aad0ba3d2a152f32b2cc",
    measurementId: "G-8M8EN7LKD6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage,firebase as default
}
