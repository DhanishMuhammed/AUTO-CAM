const ServiceRequest = require('../Models/ServiceSchema')

//  CREATE (Upload) a new service request
exports.createServiceRequest = async (req, res) => {
  try {
    const {
      customername,
      customerPhoneNo,
      address,
      email,
      notes,
      service
    } = req.body;

    if (!customername || !customerPhoneNo || !address || !email || !service?.name || !service?.type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newRequest = new ServiceRequest({
      customername,
      customerPhoneNo,
      address,
      email,
      notes,
      service
    });

    await newRequest.save();

    res.status(201).json({
      message: "Service request created successfully.",
      data: newRequest
    });
  } catch (error) {
    
    res.status(500).json({ message: "Server error", error });
    console.error("Service Error:", error);
  }
};

//  GET all service requests
exports.getAllServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch service requests", error });
  }
};

// DELETE a service request by ID
exports.deleteServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ServiceRequest.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Service request not found" });
    }

    res.status(200).json({ message: "Service request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete", error });
  }
};
