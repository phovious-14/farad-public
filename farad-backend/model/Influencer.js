const mongoose = require('mongoose');

const influencerSchema = new mongoose.Schema({
  created_at: { type: Date, default: new Date() },
  influencerId: {type: String}
});

module.exports = mongoose.model('Influencer', influencerSchema);