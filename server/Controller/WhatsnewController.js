const Banner = require("../Models/WhatsnewSchema")
const fs = require("fs");
const path = require("path");


const uploadnewbanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const newBanner = new Banner({
      name: req.body.name || 'NewBanner',
      imageUrl: req.file.filename
    });

    const saved = await newBanner.save();
    res.status(201).json({ message: 'Banner saved', data: saved });

  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
};



const getNewbanner= async(req,res)=>{
    try{
        const banners=await Banner.find()
        res.json(banners)
    }catch(err){
        res.status(500).json({error:"faild to fetch banners",details:err.message})
    }
}

const deleteNewbanner = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the banner by ID
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }

    // Construct image path
    const imagePath = path.join(__dirname, "../uploads/whatsnew", banner.imageUrl);

    // Delete file if exists
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete from DB
    await Banner.findByIdAndDelete(id);

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete banner", details: err.message });
  }
};

module.exports = { uploadnewbanner,getNewbanner,deleteNewbanner};
