const express = require("express");
const router = express.Router();
const certificationController = require("../Controllers/certificationController");
router.get("/getallcertifications", certificationController.getAllcertifications);
router.get("/certificate/:id", certificationController.getCertificate);
// router.post("/addcertification", certificationController.addCertification);
// router.put("/editcertification", certificationController.editCertification);
// router.post("/deletecertification", certificationController.deleteCertification);
module.exports = router;
