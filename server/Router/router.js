const express = require('express');
const router  = express.Router();
const userController = require('../Controller/userController');
const bannerCtrl = require('../Controller/bannerController');
const upload = require("../middilwaare/multerMiddileware"); // import directly

// register
router.post("/register", userController.register);

// login
router.post("/login", userController.login);

// Upload banner
router.post('/uploads', upload.single('image'), bannerCtrl.uploadBanner);

// Get all banners
router.get('/banners', bannerCtrl.getBanners);

// Delete banner
router.delete('/banners/:id', bannerCtrl.deleteBanner);

module.exports = router;
