const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersHistorySchema = new Schema({
  userId: {
    type: String,
    required: [true, "Id użytkownika jest wymagany"],
  },
  userName: {
    type: String,
    required: [true, "Nazwa użytownika jest wymagana"],
  },
  taskCreatedBy: {
    type: String,
  },
  taskProjectName: {
    type: String,
  },
  taskTitle: {
    type: String,
  },
  event: {
    type: String,
    required: [true, "Zdażenie jest wymagane"],
  },
  createdAt: {
    type: String,
    required: [true, "Data utworzenia jest wymagana"],
  },
});

module.exports = UsersHistory = mongoose.model(
  "usersHistory",
  UsersHistorySchema
);
