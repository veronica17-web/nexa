const carEnquiryModel = require("../model/carEnquiryModel")
const moment = require("moment")
require("moment-timezone");
const carEnquiry = async (req, res) => {
    try {
        let data = req.body
        moment.tz.setDefault("Asia/Kolkata");
        let dates = moment().format("DD-MM-YYYY");
        let times = moment().format("HH:mm:ss");
        data.date = dates;
        data.time = times;
       
        let saveDate = await carEnquiryModel.create(data)
        return res.status(201).send({ status: true, data: saveDate })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

}
//================================================================
const getOncarEnquiry = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const filter = req.query;
    const sortOptions = {};
    let data = [];

    if (Object.keys(filter).length === 0) {
      // No query parameters provided
      sortOptions.createdAt = -1;
      const data = await carEnquiryModel
        .find({ isDeleted: false })
        .sort(sortOptions);
      return res.status(200).send({ status: true, data: data });
    } else {
      const filterDate = filter.date;

      data = await carEnquiryModel.aggregate([
        { $match: { isDeleted: false, date: filterDate } },
        {
          $group: {
            _id: { phone: "$phone", model: "$model" },
            doc: { $first: "$$ROOT" },
          },
        },
        { $replaceRoot: { newRoot: "$doc" } },
        { $sort: { createdAt: -1 } },
      ]);
    }

    return res.status(200).send({ status: true, data: data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }

}
//==============================================================
const dupeCarEnquiries = async (req, res) => {
  
  try {
    const repeatedPhoneNumbers = await carEnquiryModel.aggregate([
      {
        $group: {
          _id: { phone: "$phone", model: "$model" },
          count: { $sum: 1 },
          docs: { $push: "$$ROOT" },
        },
      },
      {
        $group: {
          _id: "$_id.phone",
          phoneNumber: { $first: "$_id.phone" },
          models: {
            $push: {
              model: "$_id.model",
              count: "$count",
              docs: "$docs",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          phoneNumber: 1,
          models: {
            $cond: {
              if: { $eq: [{ $size: "$models" }, 1] },
              then: "$models",
              else: {
                $reduce: {
                  input: "$models",
                  initialValue: [],
                  in: {
                    $cond: {
                      if: { $eq: ["$$this.count", 1] },
                      then: { $concatArrays: ["$$value", ["$$this"]] },
                      else: "$$value",
                    },
                  },
                },
              },
            },
          },
        },
      },
      { $match: { $expr: { $gt: [{ $size: "$models" }, 0] } } },
    ]);

    return res.status(200).send({ status: true, data: repeatedPhoneNumbers });
  }  catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };

  //===============================================================================
  const sortCarEnquiries = async (req, res) => {
    try {
      const filter = req.query;
      const sortOptions = {}; 
   
      if (Object.keys(filter).length === 0) {
        // No query parameters provided, sort by createdAt in descending order
        sortOptions.createdAt = -1;
        const data = await carEnquiryModel.find({isDeleted:false}).sort(sortOptions);
        return res.status(200).send({ status: true, data: data });
      } else {
        // Sort by the provided filter parameters
        const data = await carEnquiryModel.find({isDeleted:false}).sort(filter);
        return res.status(200).send({ status: true, data: data });
      }
    } catch (error) {
      return res.send({ status: false, message: error.message });
    }
    
  }

module.exports = { carEnquiry, getOncarEnquiry ,dupeCarEnquiries,sortCarEnquiries}