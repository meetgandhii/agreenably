const Certification_Record = require("../Models/certificationRecordModel");

exports.addCertificationRecord = async (req, res) => {
  try {
    const { user_id, certification_id } = req.body;
    const existingRecord = await Certification_Record.findOne({
      user_id,
      certification_id,
    });

    if (existingRecord) {
      // If a record exists
      existingRecord.ongoing = req.body.ongoing || existingRecord.ongoing;
      existingRecord.timestamp = req.body.timestamp || existingRecord.timestamp;
      existingRecord.page_number = req.body.page_number || existingRecord.page_number;
      await existingRecord.save();
      res.send("Certification record updated successfully");
    } else {
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
      existingRecord.ongoing = req.body.ongoing;
      existingRecord.timestamp = req.body.timestamp;

      await existingRecord.save();
      res.send("Certification record updated successfully");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.getCertificationRecord = async (req, res) => {
  try {
    const { user_id, certification_id } = req.query;

    // Find the certification record for the specified user and certification ID
    const existingRecord = await Certification_Record.findOne({
      user_id: user_id,
      certification_id: certification_id,
    },
    );

    if (existingRecord) {
      // Send the certification response as part of the response
      res.json({ certification_response: existingRecord.certification_response });
    } else {
      // If no record found, send an empty response or an appropriate message
      res.json({ certification_response: {} });
    }
  } catch (error) {
    // Handle errors
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getCertificationPage = async (req, res) => {
  try {
    const { user_id, certification_id } = req.query;

    const existingRecord = await Certification_Record.findOne({
      user_id: user_id,
      certification_id: certification_id,
    },
    );

    if (existingRecord) {
      res.json({ page_number: existingRecord.page_number });
    } else {
      res.json({ page_number: "1" });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.putCertificationPage = async (req, res) => {
  try {
    const { user_id, certification_id } = req.body;

    const existingRecord = await Certification_Record.findOne({
      user_id: user_id,
      certification_id: certification_id,
    },
    );

    if (existingRecord) {
      existingRecord.page_number = req.body.page_number;
      await existingRecord.save();
      res.send("Certification page updated successfully");
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
