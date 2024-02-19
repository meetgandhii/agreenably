const PdfModel = require("../Models/pdfModel");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('pdf');

exports.getPdf = async (req, res) => {
    try {
        const pdf = await PdfModel.findById(req.params.id);

        if (!pdf) {
            return res.status(404).json({ success: false, message: 'PDF not found' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${pdf.fileName}"`);
        res.send(pdf.content);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

exports.uploadPdf = (req, res) => {
    console.log("called upload")
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ success: false, message: err.message });
        } else if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }

        try {
            const fileContent = req.file.buffer;
            const fileName = req.file.originalname;
            const { user_id, certification_id, question_id } = req.body;

            // Check if an entry with the specified user_id, certification_id, and question_id exists
            const existingPdf = await PdfModel.findOne({ user_id, certification_id, question_id });

            if (existingPdf) {
                // Update the existing entry
                existingPdf.content = fileContent;
                existingPdf.fileName = fileName;
                await existingPdf.save();
                res.json({ success: true, message: 'PDF updated successfully', pdfUrl: `/pdf/${existingPdf._id}` });
            } else {
                // Create a new entry
                const newPdf = new PdfModel({
                    content: fileContent,
                    fileName,
                    user_id,
                    certification_id,
                    question_id
                });

                const savedPdf = await newPdf.save();
                res.json({ success: true, message: 'PDF uploaded successfully', pdfUrl: `/pdf/${savedPdf._id}` });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });
};

exports.getPdfId = async (req, res) => {
    try {
        const { user_id, certification_id, question_id } = req.body;
        const pdfEntry = await PdfModel.findOne({ user_id, certification_id, question_id });

        if (pdfEntry) {
            pdfId = pdfEntry._id;
            res.json({ success: true, pdfId});
        } else {
            res.status(404).json({ success: false, message: "PDF entry not found" });
        }
    } catch (error) {
        console.error("Error fetching PDF ID:", error.message);
        // Handle the error, e.g., return an error response
        res.status(500).json({ success: false, error: error.message });
    }
};