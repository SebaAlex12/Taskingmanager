const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CalendarSchema = new Schema({
  eventId: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  selectedDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = Calendar = mongoose.model("calendar", CalendarSchema);
