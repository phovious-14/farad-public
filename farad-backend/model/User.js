const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  password: { type: String },
  name: { type: String },
  block: { type: String },
  blockNo: { type: String },
  userType: { type: String },
  status: { type: String },
  expoPushToken: { type: String },
  photo: { type: String },
});

module.exports = mongoose.model('User', userSchema);