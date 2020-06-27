import * as firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDVt-pG_M6zuYSwFQsqSGQ5ZN6fLtZhmkg",
    authDomain: "galleria-de-arte.firebaseapp.com",
    databaseURL: "https://galleria-de-arte.firebaseio.com",
    projectId: "galleria-de-arte",
    storageBucket: "galleria-de-arte.appspot.com",
    messagingSenderId: "361624675766",
    appId: "1:361624675766:web:c5b81f7fa3f59f416c8d17"
});

export default app;