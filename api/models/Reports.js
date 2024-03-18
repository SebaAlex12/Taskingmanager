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
    type: Boolean
  },
  Piotrek: {
    type: Boolean
  }
});

module.exports = Reports = mongoose.model("reports", ReportsSchema);
