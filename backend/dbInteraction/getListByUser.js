const { collection } = require("../models/wish");

function getListByUser(req, res) {
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
      const allLists = { dashi: dashiList, djuli: djuliList };
      res.send(allLists);
    } else {
      res.status(err);
    }
  });
}

module.exports = getListByUser;
