import firebase from "firebase"

firebase.initializeApp({
    apiKey: "AIzaSyBhhaDcQhw9bfMckMoIrXIANCv0IJB1lTI",
    authDomain: "notifixweb.firebaseapp.com",
    databaseURL: "https://notifixweb.firebaseio.com",
    projectId: "notifixweb",
    storageBucket: "notifixweb.appspot.com",
    messagingSenderId: "850699489965",
    appId: "1:850699489965:web:5cc62816232d9150cc2c24",
    measurementId: "G-9JBEWH5G5T"
});

const storage = firebase.storage();
export {storage};