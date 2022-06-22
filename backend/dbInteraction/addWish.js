const { collection } = require("../models/wish");

function addWish(req, res) {
  const newWish = {
    title: req.body.title,
    link: req.body.link,
    user: req.body.user
  };
  collection.insertOne(newWish, (err, result) => {
    if (!err) {
      res.json(result);
    } else {
      res.json("Error was raised while adding an item. " + err);
    }
  });
}

module.exports = addWish;
