const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    title: String,
    content: Buffer,
    fileName: String,
},
{
    collection: "Pdf_Records",
    versionKey: false
});

const PdfModel = mongoose.model('Pdf_Records', pdfSchema);
module.exports = PdfModel; // Export the PdfModel, not pdfSchema
