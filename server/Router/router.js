const express = require('express');
const router  = express.Router();
const userController = require('../Controller/userController');
const bannerCtrl = require('../Controller/bannerController');
const bannerupload = require("../middilwaare/multerMiddileware");
const productctrl= require("../Controller/ProductController")
const productupload=require('../middilwaare/productMiddileware') 
const serviceCrtl=require("../Controller/ServiceController")
const confromctrl=require("../Controller/conformController")
const paymentCtrl=require("../Controller/paymentController")


// register
router.post("/register", userController.register);

// login
router.post("/login", userController.login);

// Upload banner
router.post('/uploads', bannerupload.single('image'), bannerCtrl.uploadBanner);

// Add to cart
router.post('/users/cartitems', userController.addToCart);

// get cart item
router.get('/users/cartitems/:userId', userController.getCartItems);

// delete cart item
router.delete('/users/cartitems/:userId/:productId', userController.deleteCartItem);


// Get all banners
router.get('/banners', bannerCtrl.getBanners);

// Delete banner
router.delete('/banners/:id', bannerCtrl.deleteBanner);


//upload products
router.post('/uploads/products',productupload.single('image'),productctrl.addProduct);

//get all Products
router.get('/products',productctrl.getAllProducts)

//delete products

router.delete('/products/:id',productctrl.deleteProduct)

// add service
router.post('/services',serviceCrtl.createServiceRequest)

// get services

router.get('/services',serviceCrtl.getAllServiceRequests)

// delete services
router.delete('/services/:id',serviceCrtl.deleteServiceRequest)

// upload serviceConfirm

router.post('/orderconforms',confromctrl.confirmOrder)

// get serviceConfirm

router.get('/orderconforms',confromctrl.getAllConfirmedOrders)

//delete serviceConfirm

router.delete('/orderconforms/:id',confromctrl.deleteConfirmedOrder)

// Create Razorpay order
router.post('/payments/create', paymentCtrl.createOrder);

// Verify and save payment after successful transaction
router.post('/payments/verify', paymentCtrl.verifyPayment);


// get all payment
router.get('/payments',paymentCtrl.getAllPayments)



// payment veryfy



module.exports = router; 
