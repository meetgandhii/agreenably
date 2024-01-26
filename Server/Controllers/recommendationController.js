const Recommendation_Record = require("../Models/recommendationModel");
const Get_In_Touch = require("../Models/getInTouchModel");

exports.addRecommendationRecord = async (req, res) => {
  try {
      const newCertificationRecord = new Recommendation_Record({
        ...req.body,
      });
      await newCertificationRecord.save();
      res.send("Certification record added successfully");
    
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.addGetInTouchResponse = async (req, res) => {
  try {
      const newResponse = new Get_In_Touch({
        ...req.body,
      });
      await newResponse.save();
      res.send("Contacted Successfully");
    
  } catch (error) {
    return res.status(400).json(error);
  }
};