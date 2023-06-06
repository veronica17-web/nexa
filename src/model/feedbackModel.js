const mongoose = require("mongoose")
const feedbackSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        //unique:true,
        require:true,
        trim:true
    },
    outlet:{
        type:String,
        enum:["Nexa Lumbini","Nexa Kompally","nexa Jubilee"],
        require:true,
        trim:true
    },
    
    phone:{
        type:String,
        //unique:true,
        require:true,
        trim:true
    },
    comment:{
        type:String,
        trim:true
    },
    ranking:{
        type:String,
        enum :["Poor","Average","Good","Best","Excellent",""],
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
module.exports = mongoose.model('feedback', feedbackSchema)