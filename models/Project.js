const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  cms: {
    type: String
  },
  ftp: {
    type: String
  },
  panel: {
    type: String
  }
});

module.exports = Project = mongoose.model("project", ProjectSchema);
