import express from "express";
import { Release } from "github-webhook-event-types";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
    addDoc,
    collection,
    getFirestore,
    serverTimestamp,
} from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/webhook", (req, res) => {
    const data: Release = req.body;

    if (data.action === "released") {
        addDoc(collection(db, "notification"), {
            ...data,
            timestamp: serverTimestamp(),
        });
        res.status(200).send("Response recieved!!");
    } else {
        res.status(200).send("Response recieved but not the one expected!!");
    }
});

app.listen(PORT, () => {
    console.log(`Running on: http://localhost:${PORT}`);
});
