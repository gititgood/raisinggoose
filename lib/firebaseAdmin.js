// lib/firebaseAdmin.ts
import { cert, getApps, initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

const adminApp =
  getApps().length
    ? getApps()[0]
    : initializeApp(
        privateKey
          ? { credential: cert({ projectId, clientEmail, privateKey }) }
          : { credential: applicationDefault() } // allows local dev with gcloud auth
      );

export const adminDb = getFirestore(adminApp);
