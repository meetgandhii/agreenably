const Certification = require("../Models/certificationModel");
exports.getAllcertifications = async (req, res) => {
  try {
    const certifications = await Certification.find();

    res.send(certifications);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await Certification.findOne({ slug: id });


    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.json(certificate);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


// exports.addCertification = async (req, res) => {
//   try {
//     const mongoose = require('mongoose');

//     const generateObjectId = () => {
//       return mongoose.Types.ObjectId().toString();
//     };
    
//     const id = generateObjectId();
    
//         const newcertification = new Certification({
//           ...req.body,
//           _id: id,
//         });
    
//     await newcertification.save();
//     res.send("Certification added successfully");
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };
// exports.editCertification = async (req, res) => {
//   try {
//     const certification = await Certification.findOne({ _id: req.body._id });
//     certification.name = req.body.name;
//     certification.image = req.body.image;
//     certification.fuelType = req.body.fuelType;
//     certification.rentPerHour = req.body.rentPerHour;
//     certification.capacity = req.body.capacity;

//     await certification.save();

//     res.send("Certification details updated successfully");
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };
// exports.deleteCertification = async (req, res) => {
//   try {
//     await Certification.findByIdAndRemove({ _id: req.body.certificationid });

//     res.send("Certification deleted successfully");
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };
