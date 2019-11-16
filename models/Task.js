const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  projectId: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  responsiblePerson: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  priority: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: String
  },
  responsiblePersonLastComment: {
    type: Boolean
  },
  finishedAt: {
    type: String
  },
  termAt: {
    type: String
  }
});

module.exports = Task = mongoose.model("task", TaskSchema);
