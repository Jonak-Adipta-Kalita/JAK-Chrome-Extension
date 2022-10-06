"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.use((0, cors_1.default)({ origin: "*" }));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.post("/webhook", (req, res) => {
    const data = req.body;
    if (data.action === "released") {
        () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const docRef = db.ref("notifications");
                const snapshot = yield docRef.get();
                const newNotification = Object.assign(Object.assign({}, data), { timestamp: firebase_admin_1.default.database.ServerValue.TIMESTAMP });
                if (!snapshot.exists()) {
                    docRef.set([newNotification]);
                }
                else {
                    const currentNotificaions = snapshot.val();
                    currentNotificaions.push(newNotification);
                    docRef.set(currentNotificaions);
                }
            }
            catch (error) {
                res.status(500).send(`Response recieved but Error occurred: ${error.message}`);
            }
            res.status(200).send("Response recieved!!");
        });
    }
    else {
        res.status(200).send("Response recieved but not the one expected!!");
    }
});
app.get("/notifications", (req, res) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const docRef = db.ref("notifications");
            const snapshot = yield docRef.get();
            const data = snapshot.val();
            res.status(200).send(data);
        }
        catch (error) {
            res.status(500).send(`Error occurred: ${error.message}`);
        }
    }))();
});
app.delete("/notifications/:index", (req, res) => {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const docRef = db.ref("notifications");
            const snapshot = yield docRef.get();
            const datas = snapshot.val();
            docRef.set(datas.filter((data) => data !== datas[Number(req.params.index)]));
            res.status(200).send(`Deleted!! Index: ${req.params.index}`);
        }
        catch (error) {
            res.status(500).send(`Error occurred: ${error.message}`);
        }
    }))();
});
app.listen(PORT, () => {
    console.log(`Running on: http://localhost:${PORT}`);
});
