const onRoadPriceModel = require('../model/onRoadPriceModel')
const { isMobileNumber, isValidBody} = require("../validation/validation")
const onRoadPrice = async (req, res) => {
    try {
        let data = req.body
        let { name, email, phone, outlet, model } = data
        if (isValidBody(data)) return res.status(400).send({ status: false, message: "Enter the data to submit" });
        if (!name) return res.status(400).send({ status: false, message: "name is required" });

        if (!phone) return res.status(400).send({ status: false, message: "phone is required" });
        if (!isMobileNumber(phone.trim())) return res.status(400).send({ status: false, message: "Please Enter a valid Phone number" });
        //checking if phone already exist or not
        // let duplicatemobile = await drivingSchoolModel.findOne({ mobile: mobile })
        // if (duplicatemobile) return res.status(400).send({ status: false, message: "Phone already exist" })

        if (outlet) {
            let outlets = ["Nexa Lumbini", "Nexa Kompally", "nexa Jubilee"]
            if (!outlets.includes(outlet)) return res.status(400).send({ status: false, msg: `outlet must be slected among ${outlets}` });
        }
        if (model) {
            let models = ["Fronx", "jimny", "grand vitara", "ciaz", "Baleno", "ignis", "xL6"]
            if (!models.includes(model)) return res.status(400).send({ status: false, msg: `model must be slected among ${models}` });
        }
        var currentdate = new Date();
        var ToDaysdate = currentdate.getDate() + "-" + (currentdate.getMonth()+1)
            + "-" + currentdate.getFullYear()
        let ToDaystime = + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        data.date = ToDaysdate
        data.time = ToDaystime 
        let getdataCount = await onRoadPriceModel.find().count()
        data.sno = getdataCount + 1
        let duplicateData = await onRoadPriceModel.findOne({ phone: phone })//.select({phone:1},{date:1})
        if (duplicateData) {
            if (duplicateData.date !== ToDaysdate) {
                let saveDate = await onRoadPriceModel.create(data)
              return  res.status(201).send({ status: true, data: saveDate })
            }else{
                return res.status(400).send({ status: true, msg:"already existing" })
            }
        }
        let saveDate = await onRoadPriceModel.create(data)
        return res.status(201).send({ status: true, data: saveDate })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

}
const getOnRoadPrice = async (req, res) => {
    try {
    
        let data = await onRoadPriceModel.find().sort({date:-1,time:-1}).limit(200);
        res.status(200).send({ status: true, data: data })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = { onRoadPrice, getOnRoadPrice }