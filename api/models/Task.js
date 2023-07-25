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
    required: [true, "Nazwa projektu jest wymagana"]
  },
  responsiblePerson: {
    type: String,
    required: [true, "Odpowiedzialna osoba jest wymagana"]
  },
  title: {
    type: String,
    required: [true, "Tytuł jest wymagany"]
  },
  description: {
    type: String
  },
  priority: {
    type: String,
    required: [true, "Priorytet jest wymagany"]
  },
  status: {
    type: String,
    required: [true, "Status jest wymagany"]
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
  },
  mailRemainderData: {
    type: String
  }
});

module.exports = Task = mongoose.model("task", TaskSchema);
