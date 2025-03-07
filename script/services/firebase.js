import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { initializeFirestore, collection, query, getDocs, where } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEyvfPrDlMkh5TALMazsoUmfBNiNx0ff0",
  authDomain: "moveisstore-4aca1.firebaseapp.com",
  projectId: "moveisstore-4aca1",
  storageBucket: "moveisstore-4aca1.firebasestorage.app",
  messagingSenderId: "485670488719",
  appId: "1:485670488719:web:93cd2a21599915ea463efa",
  measurementId: "G-6T7CZDYK8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {experimentalForceLongPolling: true})
const collectionQuery = collection(db, "all-products")

const getItems = async () => {
  const q = query(collectionQuery)
  const querySnapshot = await getDocs(q)

  const products = []
  querySnapshot.forEach( (doc) => {
    products.push({...doc.data()})
  })
  return products
}

const getItemsFilteredByTag = async (tag) => {
  const q = query(collectionQuery, where("tag", "==", tag))
  const querySnapshot = await getDocs(q)

  const products = []
  querySnapshot.forEach( (doc) => {
    products.push({...doc.data()})
  })
  return products
}

const getItemsFilteredBySearchstring = async (searchString) => {
  const q = query(collectionQuery, where("title", ">=", searchString))
  const querySnapshot = await getDocs(q)

  const products = []
  querySnapshot.forEach( (doc) => {
    products.push({...doc.data()})
  })
  return products
}

export { getItems, getItemsFilteredByTag, getItemsFilteredBySearchstring }