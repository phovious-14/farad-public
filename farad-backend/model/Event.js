const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String },
  date: { type: String },
  time: { type: String },
  banner: { type: String }
});

module.exports = mongoose.model('Event', eventSchema);