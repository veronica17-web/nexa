
const serviceModel = require("../model/serviceModel")
const { isMobileNumber, isValidBody, isValidEmail, isValid } = require("../validation/validation")

const Serviceform = async (req, res) => {
    try {
        let data = req.body
        if (isValidBody(data)) return res.status(400).send({ status: false, message: "Enter the data to submit" });
        let { name, email, phone, address, outlet, model, pickUpRequired } = data
        if (!name) return res.status(400).send({ status: false, message: "name is required" });

        if (!email) return res.status(400).send({ status: false, message: "email is required" });
        if (!isValidEmail(email.trim())) return res.status(400).send({ status: false, message: "Please Enter a valid Email-id" });

        if (!phone) return res.status(400).send({ status: false, message: "phone is required" });
        if (!isMobileNumber(phone.trim())) return res.status(400).send({ status: false, message: "Please Enter a valid Phone number" });

        if (address) {
            if (!address) return res.status(400).send({ status: false, message: "address is required" });
            if (isValid(address)) return res.status(400).send({ status: false, message: "address should not be an empty string" });
        }

        if (outlet) {
            if (!outlet) return res.status(400).send({ status: false, message: "outlet is required" });

            let outlets = ["Nexa Lumbini", "Nexa Kompally", "nexa Jubilee"]
            if (!outlets.includes(outlet)) return res.status(400).send({ status: false, msg: `outlets must be slected among ${outlets}` });
        }
        if (model) {
            let models = ["Fronx", "jimny", "grand vitara", "ciaz", "Baleno", "ignis", "xL6"]
            if (!models.includes(model)) return res.status(400).send({ status: false, msg: `model must be slected among ${models}` });
        }
        if (pickUpRequired) {
            let request = ["yes", "no"]
            if (!request.includes(pickUpRequired)) return res.status(400).send({ status: false, msg: `pickUpRequired must be slected among ${request}` });

        }
        var currentdate = new Date();
        var ToDaysdate = currentdate.getDate() + "-" + (currentdate.getMonth()+1)
            + "-" + currentdate.getFullYear()
        let ToDaystime = + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        data.date = ToDaysdate
        data.time = ToDaystime 
        let getdataCount = await serviceModel.find().count()
        data.sno = getdataCount + 1
        let duplicateData = await serviceModel.findOne({ phone: phone })//.select({phone:1},{date:1})
        if (duplicateData) {
            if (duplicateData.date !== ToDaysdate) {
                let saveDate = await serviceModel.create(data)
              return  res.status(201).send({ status: true, data: saveDate })
            }else{
                return res.status(400).send({ status: true, msg:"already existing" })
            }
        }
        let saveDate = await serviceModel.create(data)
        return res.status(201).send({ status: true, data: saveDate })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

}
const getservices = async (req, res) => {
    try {
        let data = await serviceModel.find({isDeleted: false, count: { $gte: 0 }}).sort({date:-1,time:-1}).limit(200)
        res.status(200).send({ status: true, data: data })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}
module.exports = { Serviceform, getservices }