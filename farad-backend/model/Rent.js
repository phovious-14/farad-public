const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const rentSchema = new mongoose.Schema({
  u_id: { type: ObjectId, required: true },
  rentPrice: { type: String }
});

module.exports = mongoose.model('Rent', rentSchema);