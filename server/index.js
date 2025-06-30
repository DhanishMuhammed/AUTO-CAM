require ('dotenv').config()
const express=require('express')
const cors =require('cors')
const Route = require('./Router/router')

const autocamServer=express()

autocamServer.use(cors())
autocamServer.use(Route)



const PORT=4000

autocamServer.listen(PORT,()=>{
    console.log(`The autocam server running at port${PORT}`);
    
})

autocamServer.get('/',(req,res)=>{
    res.send("hi")
})