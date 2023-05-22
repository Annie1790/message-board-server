const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const port = 4000;
const resolve = require("path").resolve;
let db = fs.createWriteStream("database.json");

app.use(express.json())

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(resolve("./database.json"))
})

app.post("/", (req, res) => {
    res.json("success");
    db.write(JSON.stringify(req.body));
    db.end();
})

app.listen(port, () => {
    console.log("app is listening on " + port)
})