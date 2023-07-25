const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatalogSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  login: {
    type: String,
  },
  password: {
    type: String,
  },
  multicode: {
    type: String,
  },
  price: {
    type: String,
  },
  websites: {
    type: String,
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
