const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
  created_at: { type: Date, default: new Date() },
  sender: { type: String },
  receiver: { type: String },
  flowRate: { type: String },
  campaignId: { type: mongoose.SchemaTypes.ObjectId },
  requestId: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  trasferredAmount: { type: String },
  chat:[
    {
        user: { type: String },
        message: { type: String }
    }
  ],
  frameVerified: { type: Boolean },
  frameUrl: { type: String }
});

module.exports = mongoose.model('stream', streamSchema);