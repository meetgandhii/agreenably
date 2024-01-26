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
    { collection: "Recommendation_Records" }

);
const recommendationModel = mongoose.model("Recommendation_Records", recommendationSchema);
module.exports = recommendationModel;
