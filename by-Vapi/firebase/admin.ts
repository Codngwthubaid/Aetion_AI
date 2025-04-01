import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from "firebase-admin/auth"
import {getFirestore} from "firebase-admin/firestore"

const initFirebaseAdmin = () => {
    const apps = getApps()

    if (!apps.length) {
        initializeApp({
            credential: cert({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
            })
        })
    }

    return {
        // for authentication
        auth: getAuth(),
        // for db setup
        db: getFirestore()
    }
}

export const {auth, db} = initFirebaseAdmin();