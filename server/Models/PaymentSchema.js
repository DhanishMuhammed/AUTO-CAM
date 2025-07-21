const mongoose=require('mongoose')

const paymentSchema= new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        
    },
    address:{
        type:String,
        required:true
    },
    payment:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    productName:{
        type:String,

    },
    razorpay_signature:{
        type:String
    },
    razorpay_payment_id:{
        type:String
    },
    razorpay_order_id:{
        type:String
    },


})

module.exports =mongoose.model('payments',paymentSchema)