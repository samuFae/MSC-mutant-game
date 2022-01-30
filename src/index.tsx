import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'


window.onload = function () {
  const firebaseConfig = {
    apiKey: "AIzaSyBw5iNUJaT53khC5dRAprFbsF6pVQazrY0",
    authDomain: "mutantshibaclubgame.firebaseapp.com",
    projectId: "mutantshibaclubgame",
    storageBucket: "mutantshibaclubgame.appspot.com",
    messagingSenderId: "27731041430",
    appId: "1:27731041430:web:b9f7d00a8d877443f636b7",
    measurementId: "G-NGXCRFLLVS"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  logEvent(analytics, 'access');
  ReactDOM.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
    document.querySelector('#root')
  );
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
