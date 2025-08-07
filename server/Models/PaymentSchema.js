const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
   Userid:{
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
  },
  Username: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  products: [
    {
      productName: { type: String, required: true },
      quantity: { type: Number},
    }
  ],
  razorpay_signature: {
    type: String,
  },
  razorpay_payment_id: {
    type: String,
  },
  razorpay_order_id: {
    type: String,
  },
});

module.exports = mongoose.model('payments', paymentSchema);
