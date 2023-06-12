const financeModel = require("../model/financeModel");
const carEnquiryModel = require("../model/financeModel");
const moment = require("moment");
require("moment-timezone");
const {
  isMobileNumber,
  isValidEmail,
  isValidBody,
} = require("../validation/validation");
const finance = async (req, res) => {
  try {
    let data = req.body;
    let { name, email, Phone } = data;

    moment.tz.setDefault("Asia/Kolkata");
    let dates = moment().format("DD-MM-YYYY");
    let times = moment().format("HH:mm:ss");
    data.date = dates;
    data.time = times;

    let saveDate = await carEnquiryModel.create(data);
    return res.status(201).send({ status: true, data: saveDate });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//====================================================================================
const getfinance = async (req, res) => {
  try {
    const filter = req.query;
    const sortOptions = {};
    let data = [];

    if (Object.keys(filter).length === 0) {
      // No query parameters provided
      sortOptions.createdAt = -1;
      const data = await financeModel
        .find({ isDeleted: false })
        .sort(sortOptions);
      return res.status(200).send({ status: true, data: data });
    } else {
      const filterDate = filter.date;
      data = await financeModel.aggregate([
        { $match: { isDeleted: false, date: filterDate } },
        { $group: { _id: "$phone", doc: { $first: "$$ROOT" } } },
        { $replaceRoot: { newRoot: "$doc" } },
        { $sort: { createdAt: -1 } },
      ]);
    }
    return res.status(200).send({ status: true, data: data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//=============================================================================

const duplicateFinance = async (req, res) => {
  try {
    const repeatedPhoneNumbers = await financeModel.aggregate([
      {
        $group: {
          _id: "$phone",
          docs: { $push: "$$ROOT" },
          count: { $sum: 1 },
        },
      },
      { $match: { count: { $gt: 1 } } },
      { $project: { count: 1, docs: 1, _id: 0, phoneNumber: "$_id" } },
    ]);

    return res.status(200).send({ status: true, data: repeatedPhoneNumbers });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//=========================================================================
const sortFinance = async (req, res) => {
  try {
    const filter = req.query;
    const sortOptions = {};

    if (Object.keys(filter).length === 0) {
      // No query parameters provided, sort by createdAt in descending order
      sortOptions.createdAt = -1;
      const data = await serviceModel
        .find({ isDeleted: false })
        .sort(sortOptions);
      return res.status(200).send({ status: true, data: data });
    } else {
      // Sort by the provided filter parameters
      const data = await serviceModel.find({ isDeleted: false }).sort(filter);
      return res.status(200).send({ status: true, data: data });
    }
  } catch (error) {
    return res.send({ status: false, message: error.message });
  }
};

module.exports = { finance, getfinance, sortFinance , duplicateFinance};
