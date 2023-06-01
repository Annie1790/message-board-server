//Require
const express = require("express");
const cors = require("cors");
const resolve = require("path").resolve;
const fs = require("fs");

//Server
const app = express();
const port = 4000;

//Variables
app.use(express.json())
app.use(cors());

//Random color picker
function randomClr() {
    const hex = ["#FFADAD", "#FFD6A5", "#FDFFB6","#CAFFBF","#9BF6FF","#A0C4FF","#BDB2FF","#FFC6FF","#fec89a","#e3d5ca",];
    const i = Math.floor(Math.random() * hex.length);
    return hex[i];
}

app.use((req,res,next) => {
    console.log(`${req.method} request received.`);
    next();
})

app.get("/", (req, res) => {
    fs.readFile(resolve("./database.json"), 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
            res.json([]);
            res.status(404);
        } else {
            res.json(data
                .split("\n")
                .filter((segment) => segment != "")
                .map((segment => JSON.parse(segment))));
            res.status(200)
        }
    });
})

app.post("/", (req, res) => {
    try {
        res.json("success");
        req.body.color = randomClr();
        fs.writeFileSync(resolve("./database.json"), JSON.stringify(req.body) + "\n", { flag: "a+" }, error => { console.log(error) });
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log("app is listening on " + port)
})