const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema(
    {

        name: {
            type: "String"

        },
        program_name: {
            type: "String",

        },
        revenue_range: {
            type: "String",

        },
        price: {
            type: "String",

        },
        environmental: {
            type: "String",

        },
        social: {
            type: "String",

        },
        regulatory: {
            type: "String",

        },
        industries:
            [
                { type: "String" }
            ],
        description: {
            type: "String"

        },
        prerequisites: {
            type: "String"

        },
        process: {
            type: "String"

        },
        data_docs: {
            type: "String"

        },
        timeline: {
            type: "String"

        },
        renewal: {
            type: "String"

        },
        benefits: [
            { type: "String" }
        ],
        consultants_used: {
            type: "String"
        },
        geo_scope: {
            type: "String"
        },
        slug: {
            type: "String"
        },
        "questions-in-cert": [{
            type: "String"
        }],
        workflow: [{
            type: "String"
        }],
        image: {
            type: "String"
        },
        todos: [{
            type: "String"
        }]
    },
    { collection: "Certifications" }

);
const certificationModel = mongoose.model("Certifications", certificationSchema);
module.exports = certificationModel;
