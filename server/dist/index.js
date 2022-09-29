import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
const server = app.listen(PORT, () => {
    console.log(`Running on: http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map