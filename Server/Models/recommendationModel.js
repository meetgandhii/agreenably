const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
    {
        userId: {
            type: "String"
        },
        timeStamp: {
            type: "String"
        },
        email: {
            type: "String"
        },
        website: {
            type: "String"
        },
        industries:
            [
                { type: "String" }
            ],
        revenue: {
            type: "String"
        },
        budget: {
            type: "String"
        },
        preferences:
            [
                { type: "String" }
            ],
    },
    { collection: "Recommended_Certifications" }

);
const recommendationModel = mongoose.model("Recommended_Certifications", recommendationSchema);
module.exports = recommendationModel;
