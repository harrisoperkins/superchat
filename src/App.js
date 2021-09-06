import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  //config
  apiKey: "AIzaSyDTK5lwVd7PZ-7rLY5iod1Ddtl5DA0wPVY",
  authDomain: "superchat-18bec.firebaseapp.com",
  projectId: "superchat-18bec",
  storageBucket: "superchat-18bec.appspot.com",
  messagingSenderId: "239438557866",
  appId: "1:239438557866:web:d662a4a3650f15cb9656d3",
  measurementId: "G-JNGBFS96L5"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth); 

  return (
    <div className="App">
      <header className="App-header">
       
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

}

export default App;
