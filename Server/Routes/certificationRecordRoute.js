const express = require("express");
const router = express.Router();
const certificationRecordController = require("../Controllers/certificationRecordController");
router.post("/addcertificationrecord", certificationRecordController.addCertificationRecord);
router.put("/editcertificationrecord", certificationRecordController.editCertificationRecord);
module.exports = router;
