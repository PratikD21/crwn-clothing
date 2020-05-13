import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDVDFNDYcZGlHjhnSAcOQ33fYFEvHWjcrY",
  authDomain: "crwn-db-72b54.firebaseapp.com",
  databaseURL: "https://crwn-db-72b54.firebaseio.com",
  projectId: "crwn-db-72b54",
  storageBucket: "crwn-db-72b54.appspot.com",
  messagingSenderId: "670340102645",
  appId: "1:670340102645:web:cd588025448abb85da48bc",
  measurementId: "G-FCQX6QYFTT",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user ", error);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
