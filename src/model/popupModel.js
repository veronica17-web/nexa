const mongoose = require("mongoose")
const popupSchema = new mongoose.Schema({
    phone:{
        type:String,
        require:true,
        trim:true
    },
    date:{
        type: String,
        trim:true
    },
    time :{
        type:String,
        trim:true
    },
    sno:{
        type:String,
        trim:true
    },
    count :{
        type:Number,
        default:0
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })
module.exports = mongoose.model('popup', popupSchema)