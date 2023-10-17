import express from "express";

const app = express();

const PORT = 80;

//let server find the file
import path from "path";
const __dirname = path.resolve();

//I can send file
import fs from "fs";
//fn is where the files is
const fn = __dirname + "/userLidt.csv";
//**/////////////////////////////////////////////// */
// const EventEmitter = require("events");
import EventEmitter from "events";
const eventEmitter = new EventEmitter();
//subscribe
eventEmitter.on("hehe", () => {
  console.log("THis is in side hehe event!");
  //complext math
});
eventEmitter.on("uhu", () => {
  console.log("THis is in side hehe event!");
});
//triggre, emit
eventEmitter.emit("uhu");
//**/////////////////////////////////////////////// */

//middle ware to get
app.use(express.urlencoded());

//registration
app.get("/registration", (req, res) => {
  console.log(req.query);
  res.sendFile(__dirname + "/register.html");
});
//post data in server
app.post("/registration", (req, res) => {
  const { email, password } = req.body;

  //str in a formet in csv
  const str = email + "|" + password + "\n";
  //storw in cvs file
  fs.appendFile(fn, str, (error) => {
    error
      ? console.log(error)
      : console.log("data hav been wriiten in the file");
  });
  console.log("registration", req.body);
  res.send(`<h1>you are resgitered</h1>
  <a href="/">Home</a>`);
});

//login

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  console.log("login", req.body);
  const { email, password } = req.body;

  //str has email and password info from page
  const str = email + "|" + password + "\n";

  ///read the file
  //fn where is csv file is , and
  fs.readFile(fn, (error, data) => {
    if (error) {
      return res.send(error.message);
    }

    //data is buffering so i need ot chaneg to string
    console.log("login", data);
    console.log("login", data.toString());

    //users is a string with email and password from file
    const users = data.toString();

    users.includes(str)
      ? res.send("login successfully")
      : res.send("login failed");
  });
});

app.use("/", (req, res) => {
  res.send(`
  <div>
  <h1>Welcome Node.js basic</h1>
  <a href="/registration">Register</a>
  <br/>
  <br/>
  <a href="/login">Log in</a>
  </div>

  
  `);
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log("your server is running at http://localhost:" + PORT);
});
