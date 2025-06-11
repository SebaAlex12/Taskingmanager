const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  taskId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  createdById: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: String
  }
});

module.exports = Comment = mongoose.model("comment", CommentSchema);
