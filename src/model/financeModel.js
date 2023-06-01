const mongoose = require("mongoose")
const financeSchema = new mongoose.Schema({
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
    phone :{
        type:String,
        //unique:true,
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
    }
}, { timestamps: true })
module.exports = mongoose.model('finance', financeSchema)