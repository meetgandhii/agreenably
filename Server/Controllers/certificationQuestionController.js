const Certification_Questions = require("../Models/certificationQuestionModel");
exports.getAllCertificationQuestions = async (req, res) => {
  try {
    const certificationQuestions = await Certification_Questions.find();
    res.send(certificationQuestions);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// exports.updateField = async (req, res) => {
//   try {
//     await Certification_Questions.updateMany({}, { $set: { notes: "" } });
//     console.log("Notes field updated successfully.");
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };
