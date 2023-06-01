const insuranceModel = require("../model/insuranceModel")
const { isValidBody, isMobileNumber, isValidEmail, } = require("../validation/validation")

const insuranceForm = async (req, res) => {
    try {
        let data = req.body
        let { name, email, phone, outlet } = data

        if (isValidBody(data)) return res.status(400).send({ status: false, message: "Enter the data to submit" });
        if (!name) return res.status(400).send({ status: false, message: "name is required" });

        // if (!email) return res.status(400).send({ status: false, message: "email is required" });

        if (!phone) return res.status(400).send({ status: false, message: "phone is required" });
        if (!isMobileNumber(phone.trim())) return res.status(400).send({ status: false, message: "Please Enter a valid Phone number" });
        //checking if phone already exist or not
        // let duplicatemobile = await drivingSchoolModel.findOne({ mobile: mobile })
        // if (duplicatemobile) return res.status(400).send({ status: false, message: "Phone already exist" })
        if (email) {
            if (!email) return res.status(400).send({ status: false, message: "email is required" });
            if (!isValidEmail(email.trim())) return res.status(400).send({ status: false, message: "Please Enter a valid Email-id" });
        }
        //     if (outlet) {
        //     let outlets = ["Nexa Lumbini","Nexa Kompally","nexa Jubilee"]
        //         if (!outlets.includes(outlet)) return res.status(400).send({ status: false, msg: `role must be slected among ${outlets}` });
        // }
        var currentdate = new Date();
        var ToDaysdate = currentdate.getDate() + "-" + (currentdate.getMonth()+1)
            + "-" + currentdate.getFullYear()
        let ToDaystime = + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        data.date = ToDaysdate
        data.time = ToDaystime 
        let getdataCount = await insuranceModel.find().count()
        data.sno = getdataCount + 1
        let duplicateData = await insuranceModel.findOne({ phone: phone })//.select({phone:1},{date:1})
        if (duplicateData) {
            if (duplicateData.date !== ToDaysdate) {
                let saveDate = await insuranceModel.create(data)
              return  res.status(201).send({ status: true, data: saveDate })
            }else{
                return res.status(400).send({ status: true, msg:"already existing" })
            }
        }
        let saveDate = await insuranceModel.create(data)
        return res.status(201).send({ status: true, data: saveDate })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

}

const getInsurance = async (req, res) => {
    try {
        //let filter = { isDeleted: false }
        let data = await insuranceModel.find()
        res.status(200).send({ status: true, data: data })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}
module.exports = { insuranceForm, getInsurance }