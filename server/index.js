"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const firebaseApp = firebase_admin_1.default.apps.length === 0
    ? firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert({
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            projectId: process.env.FIREBASE_PROJECT_ID,
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    })
    : firebase_admin_1.default.app();
const db = firebase_admin_1.default.database(firebaseApp);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: true }));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.post("/webhook", (req, res) => {
    const data = req.body;
    if (data.action === "released") {
        try {
            const docRef = db.ref("notifications");
            docRef.get().then((snapshot) => {
                const newNotification = Object.assign(Object.assign({}, data), { timestamp: firebase_admin_1.default.database.ServerValue.TIMESTAMP });
                if (!snapshot.exists()) {
                    docRef.set([newNotification]);
                }
                else {
                    const currentNotificaions = snapshot.val();
                    currentNotificaions.push(newNotification);
                    docRef.set(currentNotificaions);
                }
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
