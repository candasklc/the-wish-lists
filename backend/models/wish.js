// grab the mongoose module
const mongoose = require("mongoose");

// wish schema
const wishSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  link: { type: String, default: "" },
  user: { type: String, default: "" },
});

// define the wish model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model("wish", wishSchema);
