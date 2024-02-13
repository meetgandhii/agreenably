const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    title: String,
    content: Buffer,
    fileName: String,
    q_id: String
},
{
    collection: "PDF_Response",
    versionKey: false
});

const PdfModel = mongoose.model('PDF_Response', pdfSchema);
module.exports = PdfModel; // Export the PdfModel, not pdfSchema
