
const Banner = require('../Models/BannerSchema');
const fs = require('fs');
const path = require('path');

// Ensure upload directory exists


// Multer setup for file upload

// Upload banner
const uploadBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const banner = new Banner({
      name: req.body.name || 'homeBanner',
      imageUrl: req.file.filename
    });

    const saved = await banner.save();
    res.status(201).json({ message: 'Banner saved', data: saved });

  } catch (err) {
    
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
};

// Get all banners
const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch banners', details: err.message });
  }
};

// Delete banner
const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }

    const imagePath = path.join(__dirname, '..', 'uploads', banner.imageUrl);

    // First delete from DB
    await Banner.findByIdAndDelete(req.params.id);

    // Then delete the image from file system
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        // Don't return 500 here, because DB deletion already succeeded
        return res.status(200).json({
          message: 'Banner deleted from DB, but image file deletion failed',
          fileError: err.message
        });
      }

      res.status(200).json({ message: 'Banner deleted successfully' });
    });

  } catch (err) {
    res.status(500).json({ error: 'Delete failed', details: err.message });
  }
};

module.exports = {  uploadBanner, getBanners, deleteBanner };