import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBSDF6B6ZF6cw8OGt1Y4tCym2DTrCbHqD0",
  authDomain: "crwn-db-f72c0.firebaseapp.com",
  projectId: "crwn-db-f72c0",
  storageBucket: "crwn-db-f72c0.appspot.com",
  messagingSenderId: "318922435622",
  appId: "1:318922435622:web:e22d75f5045ca97912cae7",
  measurementId: "G-8NMLEH3263"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })

    }catch(error){
      console.log('error creating',error.message);

    }
  }
  return userRef;

};

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;



