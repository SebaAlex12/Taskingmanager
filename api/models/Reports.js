const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
  date: {
    type: String
  },
  description: {
    type: String
  },
  Marian: {
    type: Number
  },
  Piotrek: {
    type: Number
  }
});

module.exports = Reports = mongoose.model("reports", ReportsSchema);
