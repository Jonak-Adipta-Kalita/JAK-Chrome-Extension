import { initializeApp, getApps, getApp } from "firebase/app";
import {
    collection,
    getFirestore,
    onSnapshot,
    Timestamp,
} from "firebase/firestore";
import { Release as Release_ } from "github-webhook-event-types";

interface Release extends Release_ {
    timestamp: Timestamp;
}

try {
    chrome.runtime.onInstalled.addListener((details) => {
        const name = "JAK Chrome Extension";

        if (details.reason === "install") {
            chrome.notifications.create("install", {
                type: "basic",
                iconUrl: "../../assets/images/logo.png",
                title: `Extension Installed!!`,
                message: `Thanks for Installing ${name}!!`,
                priority: 2,
            });
        } else if (details.reason === "update") {
            chrome.notifications.create("update", {
                type: "basic",
                iconUrl: "../../assets/images/logo.png",
                title: `Extension Updated!!`,
                message: `Thanks for Updating ${name}!!`,
                priority: 2,
            });
        } else if (details.reason === "chrome_update") {
            chrome.notifications.create("chrome_update", {
                type: "basic",
                iconUrl: "../../assets/images/logo.png",
                title: `Chrome got Updated!!`,
                message: `Please also Update ${name} to get the most values!!`,
                priority: 2,
            });
        } else if (details.reason === "shared_module_update") {
            chrome.notifications.create("shared_module_update", {
                type: "basic",
                iconUrl: "../../assets/images/logo.png",
                title: `Shared Module Updated!!`,
                message: `A Shared Module is Updated!!`,
                priority: 2,
            });
        }
    });

    const firebaseApp =
        getApps().length === 0
            ? initializeApp({
                  apiKey: process.env.FIREBASE_API_KEY,
                  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                  projectId: process.env.FIREBASE_PROJECT_ID,
                  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
                  appId: process.env.FIREBASE_APP_ID,
                  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
              })
            : getApp();

    const db = getFirestore(firebaseApp);

    onSnapshot(collection(db, "notifications"), {
        next(snapshot) {
            snapshot?.docs?.map((doc) => {
                const id = doc.id;
                const data = doc.data() as Release;

                console.log(id, data);
            });
        },
    });
} catch (error) {
    console.log(error);
}
