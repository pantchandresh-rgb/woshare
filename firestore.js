import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "womshare-demo.firebaseapp.com",
    projectId: "womshare-demo",
    storageBucket: "womshare-demo.appspot.com",
    messagingSenderId: "ID",
    appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Offer a Ride Logic
export async function postRide(rideData) {
    try {
        const docRef = await addDoc(collection(db, "rides"), {
            ...rideData,
            createdAt: new Date().toISOString()
        });
        alert("Ride posted successfully!");
        window.location.href = "dashboard.html";
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Search Rides Logic
export async function searchRides(start, end) {
    const q = query(collection(db, "rides"), 
        where("start_location", "==", start),
        where("destination", "==", end)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}