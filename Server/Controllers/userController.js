const User = require("../Models/userModal");
exports.login = async (req, res) => {
  const { email_address, password } = req.body;
  try {
    const user = await User.findOne({ email_address, password });
    if (user) {
      res.send(user);
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};
exports.register = async (req, res) => {
  try {
    const mongoose = require('mongoose');

    const generateObjectId = () => {
      return mongoose.Types.ObjectId().toString();
    };

    const id = generateObjectId();
    const interestedCertifications = req.body.interested_certifications || [];
    
    const newuser = new User({
      ...req.body,
      _id: id, 
      interested_certifications: interestedCertifications,
      completed_certification: [],
      ongoing_certification: []
    });
    await newuser.save();
    res.send("User registered successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
};
exports.updateDetailsAfterSubmit = async (req, res) => {
  try {
    const {userId, certificateId} = req.body;
    
    // Find the user by ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the certificate from the "interested_certifications" array
    user.interested_certifications = user.interested_certifications.filter(
      (cert) => cert.toString() !== certificateId
    );

    user.ongoing_certification = user.ongoing_certification.filter(
      (cert) => cert.toString() !== certificateId
    );

    // Add the certificate to the "completed_certification" array
    user.completed_certification.push(certificateId);

    // Save the updated user
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.updateDetailsAfterBegin = async (req, res) => {
  try {
    const {userId, certificateId} = req.body;
    
    // Find the user by ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

  if (!user.ongoing_certification.includes(certificateId)) {
      // If not present, push the new certificateId
      user.ongoing_certification.push(certificateId);

      // Save the updated user
      await user.save();
    } else {
      return res.status(400).json({ message: 'Certificate already in ongoing certifications' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
exports.updateDetails = async (req, res) => {
  try {
    const username = req.params.username;
    const { email, password, phone } = req.body;
    const updatedUser = await User.findOneAndUpdate({ username }, { email, password, phone }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.getDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.find({ _id: id })

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};


