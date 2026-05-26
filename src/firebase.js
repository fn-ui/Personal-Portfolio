import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCD7N3X_vUfFW6-czd_S2uOLq2UmlWPyRA",
  authDomain: "portfolio-testimonials-97f6b.firebaseapp.com",
  projectId: "portfolio-testimonials-97f6b",
  storageBucket: "portfolio-testimonials-97f6b.firebasestorage.app",
  messagingSenderId: "521743213133",
  appId: "1:521743213133:web:974b2912d5322c0ccbb204",
};

const app = initializeApp(firebaseConfig);

/* FIREBASE SERVICES */
export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);