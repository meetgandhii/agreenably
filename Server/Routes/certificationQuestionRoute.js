const express = require("express");
const router = express.Router();
const certificationController = require("../Controllers/certificationQuestionController");
router.get("/getallcertificationquestions", certificationController.getAllCertificationQuestions);
// router.get("/updateField/notes", certificationController.updateField);
module.exports = router;
