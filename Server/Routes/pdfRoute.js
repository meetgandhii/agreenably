const express = require("express");
const router = express.Router();
const pdfController = require("../Controllers/pdfController");
router.get("/pdf/:id", pdfController.getPdf);
router.get("/get_id", pdfController.getPdfId);
router.post("/upload", pdfController.uploadPdf);
router.get('/check', (req, res) => {
    res.send('This API works');
});
module.exports = router;
