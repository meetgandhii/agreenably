const express = require("express");
const router = express.Router();
const certificationController = require("../Controllers/certificationQuestionController");
router.get("/getallcertificationquestions", certificationController.getAllCertificationQuestions);
module.exports = router;
