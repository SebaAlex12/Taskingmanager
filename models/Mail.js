const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MailSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  projectName: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  absolutePathFile: {
    type: String
  },
  attachments: {
    type: String
  },
  createdBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
});

module.exports = Mail = mongoose.model("mail", MailSchema);
