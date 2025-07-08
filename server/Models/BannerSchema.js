const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    name: String,
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Banner', bannerSchema);
