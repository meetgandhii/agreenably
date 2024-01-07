const mongoose = require("mongoose");

const certificationRecordSchema = new mongoose.Schema(
    {

        certification_id: {
            type: "String"

        },
        user_id: {
            type: "String",

        },
        ongoing: {
            type: "String",

        },
        timestamp: {
            type: "String",

        },
        certification_response: [
            {
                question: {
                    type: "String"
                },
                answer: {
                    type: mongoose.Schema.Types.Mixed
                }
            }
        ]
    },
    {
        collection: "Certification_Records",
        versionKey: false
    }

);
const certificationRecordModel = mongoose.model("Certification_Records", certificationRecordSchema);
module.exports = certificationRecordModel;
