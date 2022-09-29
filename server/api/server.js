const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
    res.send("Hello World");
});

app.post("/api/webhook", (req, res) => {
    const data = req.body;

    console.log(data);
    res.status(200).send("Response recieved!!");
});

module.exports = app
