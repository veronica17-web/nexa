const mongoose = require("mongoose")
const carEnquirySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        //unique:true,
       // require:true,
        trim:true
    },
    phone:{
        type:String,
        //unique:true,
        require:true,
        trim:true
    },
    
    model:{
        type:String,
        enum :["Fronx","jimny","grand vitara","ciaz","Baleno","ignis","xL6"],
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
   isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt: {
        type: Date
    }

}, { timestamps: true })
module.exports = mongoose.model('carEnquiry', carEnquirySchema)