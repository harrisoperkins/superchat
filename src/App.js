import React, { useRef, useState} from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

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
       <h1>Superchat</h1>
       <SignOut />
      </header>

      <section className="App-content">
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
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});
  console.log(messages);

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'receoved';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  )
}

export default App;