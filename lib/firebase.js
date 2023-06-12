import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyCJyln85xvJPTIOht0e7OOFFkIRHTExNek",
  authDomain: "nextfire-18d47.firebaseapp.com",
  projectId: "nextfire-18d47",
  storageBucket: "nextfire-18d47.appspot.com",
  messagingSenderId: "281498998385",
  appId: "1:281498998385:web:75ca1b1b9f6b8aa220add0"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const firestore = firebase.firestore()
export const storage = firebase.storage()