const express = require("express");
const bodyParser = require("body-parser");
import mongoose from "mongoose";
import { checkForBooks } from "../src/mongoose";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

console.log("Attempting Mongoose Login");
mongoose.connect(
  "mongodb+srv://{credentials}@cs-312.1old5sc.mongodb.net/?retryWrites=true&w=majority&appName=CS-312"
);
console.log("Mongoose Login Success");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}

app.get("/", (req, res) => {
  console.log("Hello from Server");
  //checkForBooks();
});

app.post("/", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

