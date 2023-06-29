import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import { firebaseConfig } from '../constants/defaultValues'

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storage = firebase.storage();

auth.onIdTokenChanged(function (user) {
  if (user) {
    // User is signed in.
    user.getIdTokenResult().then(result => {
      localStorage.setItem('role', result.claims.role);
    });
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    // No user is signed in.
  }
});

auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    user.getIdTokenResult().then(result => {
      localStorage.setItem('role', result.claims.role);
    });
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    // No user is signed in.
  }
});

export {
  auth,
  storage
};
