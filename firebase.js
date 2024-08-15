// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoqh_jbmiCc9u_qxW02iWEuTxrYjqJXeU",
  authDomain: "acutetodotasks-crud.firebaseapp.com",
  projectId: "acutetodotasks-crud",
  storageBucket: "acutetodotasks-crud.appspot.com",
  messagingSenderId: "911803625343",
  appId: "1:911803625343:web:92344d6f309bcf5e81344a"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";   


const db = getFirestore(app);

export const saveTask = (title, description) => {
    addDoc(collection(db, 'tasks'), { title, description })
}

export const getTasks = async () => {
    /* getDocs(collection(db, 'tasks')) */
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    return querySnapshot/* .docs.map(doc => ({ id: doc.id, ...doc.data() })); */
}

export const onGetTasks = (callback) => {
    onSnapshot(collection(db, 'tasks'), callback)
}

export const deleteTask = (id) => {
    deleteDoc(doc(db, 'tasks', id))
}

export const getTask = async (id) => {
    const mayonesa = await getDoc(doc(db, 'tasks', id))
    return mayonesa
}

export const updateTask = (id, newFields) => {
    updateDoc(doc(db, 'tasks', id), newFields)
}