const mongoose = require("mongoose");

const getInTouchSchema = new mongoose.Schema(
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
    },
    { collection: "Get_In_Touch" }

);
const getInTouchModel = mongoose.model("Get_In_Touch", getInTouchSchema);
module.exports = getInTouchModel;
