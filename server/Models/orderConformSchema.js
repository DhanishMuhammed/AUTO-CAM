const mongoose=require("mongoose")


const orderconformSchema=new mongoose.Schema({
    orderid:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("OrderConform",orderconformSchema);