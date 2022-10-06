import express from "express";
import { Release as Release_ } from "github-webhook-event-types";
import firebase from "firebase-admin";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

interface Release extends Release_ {
    timestamp: Object;
}

const firebaseApp =
    firebase.apps.length === 0
        ? firebase.initializeApp({
              credential: firebase.credential.cert({
                  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(
                      /\\n/g,
                      "\n"
                  ),
                  projectId: process.env.FIREBASE_PROJECT_ID,
              }),
              databaseURL: process.env.FIREBASE_DATABASE_URL,
          })
        : firebase.app();

const db = firebase.database(firebaseApp);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/webhook", (req, res) => {
    const data: Release = req.body;

    if (data.action === "released") {
        async () => {
            try {
                const docRef = db.ref("notifications");

                const snapshot = await docRef.get();
                const newNotification: Release = {
                    ...data,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                };

                if (!snapshot.exists()) {
                    docRef.set([newNotification]);
                } else {
                    const currentNotificaions = snapshot.val() as Release[];
                    currentNotificaions.push(newNotification);

                    docRef.set(currentNotificaions);
                }
            } catch (error: any) {
                res.status(500).send(
                    `Response recieved but Error occurred: ${error.message}`
                );
            }
            res.status(200).send("Response recieved!!");
        };
    } else {
        res.status(200).send("Response recieved but not the one expected!!");
    }
});

app.get("/notifications/read", (req, res) => {
    (async () => {
        try {
            const docRef = db.ref("notifications");
            const snapshot = await docRef.get();
            const data = snapshot.val();

            res.status(200).send(data);
        } catch (error: any) {
            res.status(500).send(`Error occurred: ${error.message}`);
        }
    })();
});

app.delete("/notifications/delete", (req, res) => {
    (async () => {
        try {
            const docRef = db.ref("notifications");
            docRef.set([]);

            res.status(200).send("Deleted!!");
        } catch (error: any) {
            res.status(500).send(`Error occurred: ${error.message}`);
        }
    })();
});

app.listen(PORT, () => {
    console.log(`Running on: http://localhost:${PORT}`);
});
