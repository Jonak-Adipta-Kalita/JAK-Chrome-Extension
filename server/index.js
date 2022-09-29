const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/webhook", (req, res) => {
    const data = req.body;

    console.log(data);
    res.status(200).send("Response recieved!!");
});

const server = app.listen(3000, () => {
    console.log(`Running on: http://localhost:${server.address().port}`);
});
