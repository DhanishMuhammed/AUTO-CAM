const mongoose= require('mongoose')

const whatsnewSchema=new mongoose.Schema({
    name: String,
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model("whatsnewbanner",whatsnewSchema)