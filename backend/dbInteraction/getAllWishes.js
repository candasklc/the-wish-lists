const { collection } = require("../models/wish");

function getAllWishes(req, res) {
  collection.find({}).toArray((err, results) => {
    if (!err) {
      res.send(results);
    } else {
      res.status(err);
    }
  });
}

module.exports = getAllWishes;
