const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  Marian: {
    type: Number,
    required: true
  },
  Piotrek: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

module.exports = Reports = mongoose.model("reports", ReportsSchema);
