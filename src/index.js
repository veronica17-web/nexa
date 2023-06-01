const express = require("express")
const mongoose = require("mongoose")
const route = require("./router/route")

const app = express()
// const multer= require("multer");

// app.use( multer().any())
app.use(express.json());
// var cors = require('cors');
// app.use(cors());

mongoose.connect("mongodb+srv://Nexabroadcast:2IrOnbnFY220nfDY@cluster0.n5ultdd.mongodb.net/nexa", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))



app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
}) 