"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.post("/webhook", (req, res) => {
    const data = req.body;
    if (data.action === "released") {
        console.log(data);
        res.status(200).send("Response recieved!!");
    }
    else {
        res.status(200).send("Response recieved but not the one expected!!");
    }
});
app.listen(PORT, () => {
    console.log(`Running on: http://localhost:${PORT}`);
});
