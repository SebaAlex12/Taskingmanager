const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersHistorySchema = new Schema({
  userId: {
    type: String,
    required: [true, "Id użytkownika jest wymagany"],
  },
  event: {
    type: String,
    required: [true, "Zdażenie jest wymagane"],
  },
  createdAt: {
    type: Date,
    required: [true, "Data utworzenia jest wymagana"],
    default: Date.now,
  },
});

module.exports = UsersHistory = mongoose.model(
  "usersHistory",
  UsersHistorySchema
);
