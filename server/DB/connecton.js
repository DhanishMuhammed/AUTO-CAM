const mongoose=require('mongoose')

const connectionString=process.env.connection_string

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB atlest connected");
    
}).catch((err)=>{
    console.log("atles connection faild");
    
})