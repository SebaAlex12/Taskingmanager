const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatternSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  responsiblePerson: {
    type: String,
  },
  title: {
    type: String,
    required: [true, "Nazwa jest wymagana"],
  },
  description: {
    type: String,
  },
  elements: {
    type: String,
    required: [true, "Liczba elementów nie może być pusta"],
  },
  type: {
    type: String,
    required: [true, "Typ jest wymagany"],
  },
  status: {
    type: String,
  },
  finishedAt: {
    type: String,
  },
  termAt: {
    type: String,
  },
  createdAt: {
    type: String,
    required: [true, "Data utworzenia jest wymagana"],
  },
});

module.exports = Pattern = mongoose.model("pattern", PatternSchema);
