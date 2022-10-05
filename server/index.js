"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = require("firebase/app");
const database_1 = require("firebase/database");
const dotenv_1 = __importDefault(require("dotenv"));
const PRODUCTION = true;
if (!PRODUCTION)
    dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const firebaseApp = (0, app_1.getApps)().length === 0
    ? (0, app_1.initializeApp)({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    })
    : (0, app_1.getApp)();
const db = (0, database_1.getDatabase)(firebaseApp);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.post("/webhook", (req, res) => {
    const data = req.body;
    if (data.action === "released") {
        try {
            const docRef = (0, database_1.ref)(db, "notification");
            (0, database_1.get)(docRef).then((snapshot) => {
                const currentNotificaions = snapshot.val();
                const newNotification = Object.assign(Object.assign({}, data), { timestamp: (0, database_1.serverTimestamp)() });
                (0, database_1.set)(docRef, currentNotificaions
                    ? currentNotificaions.push(newNotification)
                    : [newNotification]);
            });
            res.status(200).send("Response recieved!!");
        }
        catch (error) {
            res.status(500).send(`Response recieved but Error occurred: ${error.message}`);
        }
    }
    else {
        res.status(200).send("Response recieved but not the one expected!!");
    }
});
app.listen(PORT, () => {
    console.log(`Running on: http://localhost:${PORT}`);
});
