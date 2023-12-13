import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged
 } from 'firebase/auth';
 import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDIPFKfxjYS1jFdou2R7r9JvxedMqP8BTQ",
    authDomain: "univers-1d85e.firebaseapp.com",
    projectId: "univers-1d85e",
    storageBucket: "univers-1d85e.appspot.com",
    messagingSenderId: "633979392191",
    appId: "1:633979392191:web:a307465bbaa2cee998f60a"
  };
  
 
  const firebaseApp = initializeApp(firebaseConfig);
  export const storage = getStorage();

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
           console.log('error creating the user', error.message); 
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailandPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);