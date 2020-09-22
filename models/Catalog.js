const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatalogSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
});

module.exports = Catalog = mongoose.model("catalog", CatalogSchema);
