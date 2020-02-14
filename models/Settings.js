const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
  mailingDate: {
    type: String,
    required: true
  }
});

module.exports = Settings = mongoose.model("settings", SettingsSchema);
