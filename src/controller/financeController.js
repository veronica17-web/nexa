const financeModel = require("../model/financeModel")
const carEnquiryModel = require("../model/financeModel")

const { isMobileNumber,isValidEmail,isValidBody }=require("../validation/validation")
const finance = async (req,res)=>{
    try {
        let data = req.body
        let {name,email,Phone,}=data
        if (isValidBody(data)) return res.status(400).send({ status: false, message: "Enter the data to submit" });
        if (!name) return res.status(400).send({ status: false, message: "name is required" });
    
        if(Phone ){
        if (!Phone ) return res.status(400).send({ status: false, message: "Phone  is required" });
        if (!isMobileNumber(Phone.trim())) return res.status(400).send({ status: false, message: "Please Enter a valid Phone  number" });
    }
        //checking if phone already exist or not
        // let duplicatemobile = await drivingSchoolModel.findOne({ mobile: mobile })
        // if (duplicatemobile) return res.status(400).send({ status: false, message: "Phone already exist" })
    
       
        if(email){
            if (!email) return res.status(400).send({ status: false, message: "email is required" });
            if (!isValidEmail(email.trim())) return res.status(400).send({ status: false, message: "Please Enter a valid Email-id" });
        }
        var currentdate = new Date();
        var ToDaysdate = currentdate.getDate() + "-" + (currentdate.getMonth()+1)
            + "-" + currentdate.getFullYear()
        let ToDaystime = + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        data.date = ToDaysdate
        data.time = ToDaystime 
        let getdataCount = await financeModel.find().count()
        data.sno = getdataCount + 1
        let duplicateData = await financeModel.findOne({ phone:Phone})//.select({phone:1},{date:1})
        if (duplicateData) {
            if (duplicateData.date !== ToDaysdate) {
                let saveDate = await financeModel.create(data)
              return  res.status(201).send({ status: true, data: saveDate })
            }else{
                return res.status(400).send({ status: true, msg:"already existing" })
            }
        }
        let saveDate = await carEnquiryModel.create(data)
        return res.status(201).send({status:true,data:saveDate})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
  
}
const getfinance = async (req,res)=>{
    try {
        //let filter = { isDeleted: false }
        let data = await financeModel.find()
        res.status(200).send({ status: true, data: data })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}
module.exports = {finance, getfinance}