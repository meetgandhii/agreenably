const Certification_Record = require("../Models/certificationRecordModel");

exports.addCertificationRecord = async (req, res) => {
  try {
    const { user_id, certification_id } = req.body;

    // Check if a record already exists for the given user_id and certification_id
    const existingRecord = await Certification_Record.findOne({
      user_id,
      certification_id,
    });

    if (existingRecord) {
      // If a record exists
      existingRecord.ongoing = req.body.ongoing || existingRecord.ongoing;
      existingRecord.timestamp = req.body.timestamp || existingRecord.timestamp;

      await existingRecord.save();
      res.send("Certification record updated successfully");
    } else {
      // If no record exists
      const newCertificationRecord = new Certification_Record({
        ...req.body,
      });

      await newCertificationRecord.save();
      res.send("Certification record added successfully");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.editCertificationRecord = async (req, res) => {
  try {
    const { user_id, certification_id } = req.body;

    const existingRecord = await Certification_Record.findOne({
      user_id,
      certification_id,
    });

    if (existingRecord) {
      existingRecord.certification_response = req.body.certification_response;
      existingRecord.ongoing = '0';
      existingRecord.timestamp = req.body.timestamp;

      await existingRecord.save();
      res.send("Certification record updated successfully");
    } 
  } catch (error) {
    return res.status(400).json(error);
  }
};
