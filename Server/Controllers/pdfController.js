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
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ success: false, message: err.message });
        } else if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }

        try {
            const fileContent = req.file.buffer;
            const fileName = req.file.originalname;
        
            const newPdf = new PdfModel({
              title: req.body.title,
              content: fileContent,
              fileName: fileName,
            });
        
            const savedPdf = await newPdf.save();
        
            const pdfUrl = `/pdf/${savedPdf._id}`;
        
            res.json({ success: true, message: 'PDF uploaded successfully', pdfUrl: pdfUrl });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });
}
