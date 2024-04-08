const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email_address: { type: String, required: true },
  website_address: { type: String, required: true },
  company_name : { type: String, required: true },
  interested_certifications: [
    { type: String, required: true },
  ],
  completed_certification: [
    { type: String, required: true },
  ],
  ongoing_certification: [
    { type: String, required: true },
  ],
},
{ collection: "User" }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
