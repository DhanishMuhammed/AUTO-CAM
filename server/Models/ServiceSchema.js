const mongoose=require("mongoose")


const serviceSchema=mongoose.Schema({
    customername:{
        type:String,
        required:true
    },
    customerPhoneNo:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
    },
    notes:{
      type:String
    },
   service: {
  name: { type: String, required: true }, 
  features: { type: [String], default: [] }, 
  type: { type: String, enum: ["Service", "Installation"], required: true } 
}
    
    
})

module.exports=mongoose.model("Service",serviceSchema) 