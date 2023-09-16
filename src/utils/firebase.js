import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyACP7FU8m4fHaSVIlDdDuNP7kOo3HcRqfI',
  authDomain: 'cryptolens-9ef93.firebaseapp.com',
  projectId: 'cryptolens-9ef93',
  storageBucket: 'cryptolens-9ef93.appspot.com',
  messagingSenderId: '802872851194',
  appId: '1:802872851194:web:96c1bd1955c49195e26743',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
