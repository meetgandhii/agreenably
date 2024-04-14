const express = require("express");
const router = express.Router();
const certificationRecordController = require("../Controllers/certificationRecordController");
router.post("/addcertificationrecord", certificationRecordController.addCertificationRecord);
router.put("/editcertificationrecord", certificationRecordController.editCertificationRecord);
router.put("/editcertificationpage", certificationRecordController.putCertificationPage);
router.get("/getcertificationrecord", certificationRecordController.getCertificationRecord);
router.get("/getcertificationpage", certificationRecordController.getCertificationPage);
module.exports = router;
