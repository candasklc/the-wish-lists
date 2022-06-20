const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./config/db");
const getAllWishes = require("./dbInteraction/getAllWishes");
const addWish = require("./dbInteraction/addWish");
const deleteWish = require("./dbInteraction/deleteWish");

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// ------------- PAGE ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/angularExpress/index.html"));
});

// ------------- STATIC FILES
app.use(express.static(path.join(__dirname, "/dist/angularExpress")));
app.use(express.static(path.join(__dirname, "/src/app/components/mainpage")));

// ------------- Db interaction
app.get("/all", (req, res) => {
  getAllWishes(req, res);
});

app.post("/add-wish", (req, res) => {
  addWish(req, res);
});

app.delete("/delete/:id", (req, res) => {
  deleteWish(req, res);
});

app.listen(PORT, () => {
  console.info(`Listening at http://localhost:${PORT}`);
});
