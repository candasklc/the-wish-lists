function getCategories(req, res) {
  const categories = ["clothes", "shoes", "electronic", "places", "other"];
  res.json(categories);
}

module.exports = getCategories;
