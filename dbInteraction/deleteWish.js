const ObjectId = require("mongoose").Types.ObjectId;
const { collection } = require("../models/wish");

function deleteWish(req, res) {
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
}

module.exports = deleteWish;
