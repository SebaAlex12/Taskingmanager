const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessengerSchema = new Schema({
  from: {
    type: String,
    required: [true, "Adresat wiadomości jest wymagany"]
  },
  to: {
    type: String,
    required: [true, "Odbiorca jest wymagany"]
  },
  msg: {
    type: String,
    required: [true, "Treść jest wymagana"]
  },
  createdAt: {
    type: String,
    required: [true, "Data utworzenia wiadomości jest wymagana"]
  }
});

module.exports = Messenger = mongoose.model("messenger", MessengerSchema);
