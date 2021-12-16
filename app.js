const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./config/db");
const ObjectId = require("mongoose").Types.ObjectId;
const { collection } = require("./models/wish");

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

// ------------- API ROUTES
app.get("/all", (req, res) => {
  collection.find({}).toArray((err, results) => {
    if (!err) {
      res.send(results);
    } else {
      res.status(err);
    }
  });
});

app.post("/add-wish", (req, res) => {
  const newWish = {
    title: req.body.title,
    link: req.body.link,
    user: req.body.user,
  };
  collection.insertOne(newWish, (err, result) => {
    if (!err) {
      res.json(result);
    } else {
      res.json("Error was raised while adding an item. " + err);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    res.json("No records with given id: " + id);
  } else {
    try {
      collection.deleteOne({ _id: ObjectId(id) });
      res.json("Item is removed with id: " + id);
    } catch (e) {
      res.json("Error was raised while removing an item. " + e);
    }
  }
});

app.listen(PORT, () => {
  console.info(`Listening at http://localhost:${PORT}`);
});
