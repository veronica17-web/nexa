const contactUsModel = require("../model/contactModel")
const { isMobileNumber, isValid, isValidBody, isValidEmail } = require("../validation/validation")
const contactForm = async (req, res) => {
    try {
        let data = req.body
        let { name, email, phone, outlet, model, comment } = data
        if (isValidBody(data)) return res.status(400).send({ status: false, message: "Enter the data to submit" });
        if (!name) return res.status(400).send({ status: false, message: "name is required" });

        if (!phone) return res.status(400).send({ status: false, message: "phone is required" });
        if (!isMobileNumber(phone.trim())) return res.status(400).send({ status: false, message: "Please Enter a valid phone number" });

        if (!email) return res.status(400).send({ status: false, message: "email is required" });
        if (!isValidEmail(email.trim())) return res.status(400).send({ status: false, message: "Please Enter a valid Email-id" });

        if (!outlet) return res.status(400).send({ status: false, message: "outlet is required" });
        let outlets = ["Nexa Lumbini", "Nexa Kompally", "nexa Jubilee"]
        if (!outlets.includes(outlet)) return res.status(400).send({ status: false, msg: `outlet must be slected among ${outlets}` });

        if (model) {
            let models = ["Fronx", "jimny", "grand vitara", "ciaz", "Baleno", "ignis", "xL6"]
            if (!models.includes(model)) return res.status(400).send({ status: false, msg: `model must be slected among ${models}` });
        }
        if (comment) {
            if (isValid(comment)) return res.status(400).send({ status: false, message: "comment should not be an empty string" });
        }
        var currentdate = new Date();
        var ToDaysdate = currentdate.getDate() + "-" + (currentdate.getMonth()+1)
            + "-" + currentdate.getFullYear()
        let ToDaystime = + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        data.date = ToDaysdate
        data.time = ToDaystime 
        let getdataCount = await contactUsModel.find().count()
        data.sno = getdataCount + 1
        let duplicateData = await contactUsModel.findOne({ phone: phone })//.select({phone:1},{date:1})
        if (duplicateData) {
            if (duplicateData.date !== ToDaysdate) {
                let saveDate = await contactUsModel.create(data)
              return  res.status(201).send({ status: true, data: saveDate })
            }else{
                return res.status(400).send({ status: true, msg:"already existing" })
            }
        }
        let saveDate = await contactUsModel.create(data)
        res.status(201).send({ status: true, data: saveDate })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getcontactForm = async (req, res) => {
    try {
        //let filter = { isDeleted: false }
        let data = await contactUsModel.find()
        res.status(200).send({ status: true, data: data })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports = { contactForm, getcontactForm }