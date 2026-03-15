import { db } from "./firebase-config.js";

import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// COLLECTION
const ridesCollection = collection(db, "rides");


// ADD RIDE
export async function addRide(data) {

  try {

    await addDoc(ridesCollection, data);

    alert("Ride posted successfully!");

  } catch (error) {

    console.error(error);

  }

}


// GET RIDES
export async function getRides() {

  const querySnapshot = await getDocs(ridesCollection);

  const rides = [];

  querySnapshot.forEach((doc) => {

    rides.push({ id: doc.id, ...doc.data() });

  });

  return rides;

}