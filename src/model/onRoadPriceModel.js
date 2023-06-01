const mongoose = require("mongoose")
const OnroadPriceSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    phone:{
        type:String,
        //unique:true,
        require:true,
        trim:true
    },
    outlet:{
        type:String,
        enum:["Nexa Lumbini","Nexa Kompally","nexa Jubilee"],
      //  require:true,
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
    sno:{
        type:String,
        trim:true
    }
}, { timestamps: true })
module.exports = mongoose.model('OnroadPrice', OnroadPriceSchema)