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

exports.changeQuestions = async (req, res) => {
  try{
    const questions = [
      "65ca843476ec676fbac97a1c",
      "65ca843476ec676fbac97a1d",
      "65ca843476ec676fbac97a1e",
      "65ca843476ec676fbac97a1f",
      "65ca843476ec676fbac97a20",
      "65ca843476ec676fbac97a21",
      "65ca843476ec676fbac97a22",
      "65ca843476ec676fbac97a23",
      "65ca843476ec676fbac97a24",
      "65ca843476ec676fbac97a25",
      "65ca843476ec676fbac97a26",
      "65ca843476ec676fbac97a27",
      "65ca843476ec676fbac97a28",
      "65ca843476ec676fbac97a29",
      "65ca843476ec676fbac97a2a",
      "65ca843476ec676fbac97a2b",
      "65ca843476ec676fbac97a2c",
      "65ca843476ec676fbac97a2d",
      "65ca843476ec676fbac97a2e",
      "65ca843476ec676fbac97a2f",
      "65ca843476ec676fbac97a30",
      "65ca843476ec676fbac97a31",
      "65ca843476ec676fbac97a32",
      "65ca843476ec676fbac97a33",
      "65ca843476ec676fbac97a34",
      "65ca843476ec676fbac97a35",
      "65ca843476ec676fbac97a36",
      "65ca843476ec676fbac97a37",
      "65ca843476ec676fbac97a38",
      "65ca843476ec676fbac97a39",
      "65ca843476ec676fbac97a3a",
      "65ca843476ec676fbac97a3b",
      "65ca843476ec676fbac97a3c",
      "65ca843476ec676fbac97a3d",
      "65ca843476ec676fbac97a3e",
      "65ca843476ec676fbac97a3f",
      "65ca843476ec676fbac97a40",
      "65ca843476ec676fbac97a41",
      "65ca843476ec676fbac97a42",
      "65ca843476ec676fbac97a43",
      "65ca843476ec676fbac97a44",
      "65ca843476ec676fbac97a45",
      "65ca843476ec676fbac97a46",
      "65ca843476ec676fbac97a47",
      "65ca843476ec676fbac97a48",
      "65ca843476ec676fbac97a49",
      "65ca843476ec676fbac97a4a",
      "65ca843476ec676fbac97a4b",
      "65ca843476ec676fbac97a4c",
      "65ca843476ec676fbac97a4d",
      "65ca843476ec676fbac97a4e",
      "65ca843476ec676fbac97a4f",
      "65ca843476ec676fbac97a50",
      "65ca843476ec676fbac97a51",
      "65ca843476ec676fbac97a52",
      "65ca843476ec676fbac97a53",
      "65ca843476ec676fbac97a54",
      "65ca843476ec676fbac97a55",
      "65ca843476ec676fbac97a56"
  ]
  const { id } = req.params;
    const certification = await Certification.findOne({ slug: id });

    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    // Update the "questions-in-cert" field with the new list of questions
    certification["questions-in-cert"] = questions;

    // Save the updated certification document
    const updatedCertification = await certification.save();

    res.json(updatedCertification);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
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
