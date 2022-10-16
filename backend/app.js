const express = require("express");
const app = express();
const db = require("./config/db");
const getListByUser = require("./dbInteraction/getListByUser");
const getCategories = require("./dbInteraction/getCategories");
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
  res.sendFile("/dist/angularExpress/index.html", { root: "." });
});

app.get("/categories", (req, res) => {
  getCategories(req, res);
});

// ------------- Db interaction
app.get("/list", (req, res) => {
  getListByUser(req, res);
});

app.post("/add-wish", (req, res) => {
  addWish(req, res);
});

app.delete("/delete/:id", (req, res) => {
  deleteWish(req, res);
});

module.exports = app;
