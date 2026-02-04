const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  taskId: {
    type: String
  },
  userId: {
    type: String
  },
  createdById: {
    type: String
  },
  description: {
    type: String
  },
  createdAt: {
    type: String
  }
});

module.exports = Comment = mongoose.model("comment", CommentSchema);
