const contactUsModel = require("../model/contactModel");

const moment = require("moment");
require("moment-timezone");
const contactForm = async (req, res) => {
  try {
    let data = req.body;
    let { name, email, phone, outlet, model, comment } = data;
    moment.tz.setDefault("Asia/Kolkata");
    let dates = moment().format("DD-MM-YYYY");
    let times = moment().format("HH:mm:ss");
    data.date = dates;
    data.time = times;
    let saveDate = await contactUsModel.create(data);
    res.status(201).send({ status: true, data: saveDate });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//===============================================================================
const duplicateContactUsForm = async (req, res) => {
  try {
    const repeatedPhoneNumbers = await contactUsModel.aggregate([
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
//======================================================================

const getcontactForm = async (req, res) => {
  try {
    const filter = req.query;
    const sortOptions = {};
    let data = [];

    if (Object.keys(filter).length === 0) {
      // No query parameters provided
      sortOptions.createdAt = -1;
      const data = await contactUsModel
        .find({ isDeleted: false })
        .sort(sortOptions);
      return res.status(200).send({ status: true, data: data });
    } else {
      const filterDate = filter.date;
      data = await contactUsModel.aggregate([
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
//=======================================================================================

const sortContactUs = async (req, res) => {
  try {
    const filter = req.query;
    const sortOptions = {};

    if (Object.keys(filter).length === 0) {
      // No query parameters provided, sort by createdAt in descending order
      sortOptions.createdAt = -1;
      const data = await contactUsModel
        .find({ isDeleted: false })
        .sort(sortOptions);
      return res.status(200).send({ status: true, data: data });
    } else {
      // Sort by the provided filter parameters
      const data = await contactUsModel.find({ isDeleted: false }).sort(filter);
      return res.status(200).send({ status: true, data: data });
    }
  } catch (error) {
    return res.send({ status: false, message: error.message });
  }
};

module.exports = {
  contactForm,
  getcontactForm,
  duplicateContactUsForm,
  sortContactUs,
};
