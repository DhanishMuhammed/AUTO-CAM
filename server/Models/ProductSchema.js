const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    productname:{
        type:String,
        required:true,
        trim:true
    },
    productImage:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productType:{
        type:String,
        required:true
    }
});

module.exports= mongoose.model("Products",productSchema)