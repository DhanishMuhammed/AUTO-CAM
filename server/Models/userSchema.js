// Models/userSchema.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 
    Username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    cartitems: [
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
    quantity: { type: Number, default: 1 }
  }
]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);