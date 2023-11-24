import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAqmIVk0s4ce5LAEBz7STkqdzgSCP3G9iQ',
  authDomain: 'shuttle-tracker-3997d.firebaseapp.com',
  databaseURL: 'https://shuttle-tracker-3997d-default-rtdb.firebaseio.com',
  projectId: 'shuttle-tracker-3997d',
  storageBucket: 'shuttle-tracker-3997d.appspot.com',
  messagingSenderId: '1005418899561',
  appId: '1:1005418899561:web:6269b4774ba12176aa5af8',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };
