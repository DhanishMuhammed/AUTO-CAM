const OrderConform = require('../Models/orderConformSchema');
const sendConfirmationMail = require('../Controller/mailController'); // Corrected name

// Create a new confirmed order
exports.confirmOrder = async (req, res) => {
  const { orderid, email, customername, serviceName } = req.body;

  if (!orderid || !email || !customername || !serviceName) {
    return res.status(400).json({ message: "Order ID, customer name, email, and service name are required" });
  }

  try {
    const newOrder = new OrderConform({ orderid });
    await newOrder.save();

    //  Send confirmation email
    await sendConfirmationMail(email, customername, serviceName);

    res.status(201).json({ message: "Order confirmed and mail sent", data: newOrder });
  } catch (err) {
    console.error("Confirm order error:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};


// Get all confirmed orders
exports.getAllConfirmedOrders = async (req, res) => {
  try {
    const orders = await OrderConform.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Delete a confirmed order by ID
exports.deleteConfirmedOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await OrderConform.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
