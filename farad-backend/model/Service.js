const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceType: { type: String },
    workers: [
        {
            phoneNumber: { type: String },
            name: { type: String },
            shopName: { type: String },
            address: { type: String }
        }
    ]
  
});

module.exports = mongoose.model('Service', serviceSchema);