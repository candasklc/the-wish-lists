const { collection } = require("../models/wish");

function getAllWishes(req, res) {
  collection.find({}).toArray((err, results) => {
    if (!err) {
      const dashiList = [];
      const djuliList = [];
      results.filter((x) => {
        if (x.user.toLocaleLowerCase() === "dashi") {
          dashiList.push(x);
        } else if (x.user.toLocaleLowerCase() === "djuli") {
          djuliList.push(x);
        }
      });
      const allLists = { dashiList: dashiList, djuliList: djuliList };
      res.send(allLists);
    } else {
      res.status(err);
    }
  });
}

module.exports = getAllWishes;
