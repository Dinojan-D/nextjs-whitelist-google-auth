// lib/firebase/client-config.ts
import "server-only";
import admin from 'firebase-admin';



const serviceAccount = require('./serviceAccount.json');


if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.log('Firebase admin SDK already initialized');
}

const db = admin.firestore(); 
const auth = admin.auth(); 

export { db, auth };
