const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  created_at: { type: Date, default: new Date() },
  title: { type: String },
  budget_allowance: { type: String },
  ad_text_message: { type: String },
  image_hash: { type: String },
  active: { type: Boolean, default: true },
  walletAddress: { type: String },
  haveClient: { type: Boolean, default: false },
  frameUrl: { type: String }, 
  requests: [
    { 
      walletAddress: { type: String },
      created_at: { type: Date, default: new Date() },
      accept: {type: Boolean, default: false},
      farcasterName: { type: String },
      influencerId: { type: String } 
    }
  ]
});

module.exports = mongoose.model('Campaign', campaignSchema);