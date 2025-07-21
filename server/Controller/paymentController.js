const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require('../Models/PaymentSchema'); 

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. Create Razorpay order
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt = "receipt#1" } = req.body;

    const options = {
      amount: amount * 100, // Razorpay uses paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ success: false, error: "Order creation failed" });
  }
};

// 2. Verify payment and save details
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      Username,
      phonenumber,
      address,
      payment,
      email,
      productName
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const newPayment = new Payment({
        Username: Username,
        phonenumber,
        address,
        payment,
        email,
        productName
      });

      await newPayment.save();

      res.status(200).json({ success: true, message: "Payment verified and stored" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ success: false, error: "Verification failed" });
  }
};

// 3. Get all paid orders
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ _id: -1 });
    res.status(200).json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
};
