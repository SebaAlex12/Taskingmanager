const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nazwa jest wymagana"]
  },
  email: {
    type: String,
    required: [true, "Email jest wymagany"]
  },
  password: {
    type: String,
    required: [true, "Hasło jest wymagane"]
  },
  status: {
    type: String,
    required: [true, "Status jest wymagany"]
  },
  projects: {
    type: String
  },
  users: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
