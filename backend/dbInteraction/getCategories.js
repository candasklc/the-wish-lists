function getCategories(req, res) {
  const categories = ["clothes", "shoes", "electronic", "places"];
  res.json(categories);
}

module.exports = getCategories;
