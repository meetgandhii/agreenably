const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    content: Buffer,
    fileName: String,
    question_id: String,
    certification_id: String,
    user_id: String
},
{
    collection: "PDF_Response",
    versionKey: false
});

const PdfModel = mongoose.model('PDF_Response', pdfSchema);
module.exports = PdfModel;
