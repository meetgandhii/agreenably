const mongoose = require("mongoose");

const certificationQuestionSchema = new mongoose.Schema(
    {
        type: {
          type: String,
          required: true,
          enum: ['single', 'multi', 'file', 'text']
        },
        type_content: {
          type: mongoose.Schema.Types.Mixed,
          required: true
        },
        content: { type: String, required: true },
        heading: { type: String, required: true },
        index: { type: String, required: true }
      },
      { collection: "Questions", versionKey: false }
    );
const certificationQuestionModel = mongoose.model("Questions", certificationQuestionSchema);
module.exports = certificationQuestionModel;
