const mongoose = require("mongoose");

const certificationRecordSchema = new mongoose.Schema(
    {

        certification_id: {
            type: "String"

        },
        page_number: {
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
        certification_response: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
        }
        
    },
    {
        collection: "Certification_Response",
        versionKey: false
    }

);
const certificationRecordModel = mongoose.model("Certification_Response", certificationRecordSchema);
module.exports = certificationRecordModel;
