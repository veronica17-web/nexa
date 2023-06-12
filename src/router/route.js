const express = require("express");
const router = express.Router();
const {
  views,
  getPopups,
  dupePopups,
  sortpopup,
} = require("../controller/popupController");
const {
  carEnquiry,
  getOncarEnquiry,
  dupeCarEnquiries,
  sortCarEnquiries,
} = require("../controller/carEnquirycontroller");
const {
  onRoadPrice,
  getOnRoadPrice,
  sortOnRoadPrice,
  duplicateOnRoadPrice,
} = require("../controller/onRoadPriceController");
const {
  insuranceForm,
  getInsurance,
  sortInsurance,
  duplicateInsurance,
} = require("../controller/insuranceController");
const {
  finance,
  getfinance,
  sortFinance,
  duplicateFinance,
} = require("../controller/financeController");
const {
  Serviceform,
  getservices,
  duplicateService,
  sortService,
} = require("../controller/serviceController");
const {
  contactForm,
  getcontactForm,
  duplicateContactUsForm,
  sortContactUs,
} = require("../controller/contactController");
const {
  feedbackForm,
  getfeedbackForm,
  sortFeedback,
  duplicatefeedback,
} = require("../controller/feedbackController");
router.get("/test-me", function (req, res) {
  res.send("this is successfully created");
});
//===========================popup=============================
router.post("/popup", views);
router.get("/getPopups", getPopups);
router.get("/dupePopup", dupePopups);
router.get("/sortpopup", sortpopup);
//===================================carEnquiry=================================
router.post("/carEnquiry", carEnquiry);
router.get("/getOncarEnquiry", getOncarEnquiry);
router.get("/dupeCarEnquiries", dupeCarEnquiries);
router.get("/sortCarEnquiries", sortCarEnquiries);
//=========================on road price==================================================
router.post("/onRoadPrice", onRoadPrice);
router.get("/getOnRoadPrice", getOnRoadPrice);
router.get("/sortOnRoadPrice", sortOnRoadPrice)
router.get("/duplicateOnRoadPrice",duplicateOnRoadPrice,)

//==============================insurance===================================
router.post("/insurance", insuranceForm);
router.get("/getInsurance", getInsurance);
router.get("/duplicateInsurance", duplicateInsurance);
router.get("/sortInsurance", sortInsurance);
//==================finance==============================
router.post("/finance", finance);
router.get("/getfinance", getfinance);
router.get("/sortFinance", sortFinance);
router.get("/duplicateFinance", duplicateFinance);
//==========================services=======================================
router.post("/Serviceform", Serviceform);
router.get("/getservices", getservices);
router.get("/duplicateService", duplicateService);
router.get("/sortService", sortService);
//==============================contactForm-============================
router.post("/contactForm", contactForm);
router.get("/getcontactForm", getcontactForm);
router.get("/duplicateContactUsForm", duplicateContactUsForm);
router.get("/sortContactUs", sortContactUs);
//===================== feedBack ================================
router.post("/feedbackForm", feedbackForm);
router.get("/getfeedbackForm", getfeedbackForm);
router.get("/sortFeedback",sortFeedback)
router.get("/duplicatefeedback", duplicatefeedback)

module.exports = router;
