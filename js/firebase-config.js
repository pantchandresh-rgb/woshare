// Firebase SDK

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// CONFIG
const firebaseConfig = {

  apiKey: "YOUR_KEY",

  authDomain: "YOUR_DOMAIN",

  projectId: "YOUR_PROJECT",

  storageBucket: "YOUR_BUCKET",

  messagingSenderId: "YOUR_ID",

  appId: "YOUR_APP_ID"

};


// INITIALIZE
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };