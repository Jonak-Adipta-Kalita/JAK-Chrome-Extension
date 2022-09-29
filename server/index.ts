import express from "express";
import { Release } from "github-webhook-event-types";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/webhook", (req, res) => {
    const data: Release = req.body;

    if (data.action === "released") {
        console.log(data);
        res.status(200).send("Response recieved!!");
    } else {
        res.status(200).send("Response recieved but not the one expected!!");
    }
});

app.listen(PORT, () => {
    console.log(`Running on: http://localhost:${PORT}`);
});
