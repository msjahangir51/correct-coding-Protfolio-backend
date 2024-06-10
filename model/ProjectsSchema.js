const mongoose = require("mongoose")
const LatestProjectSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
     desc: {
        type: String,
        required: true
    },
     live: {
        type: String,
        required: true
    },
     github: {
        type: String,
        required: true
    },
     image: {
        type: String,
        required: true
    }
})


const LatestProduct = mongoose.model("LatestProjects", LatestProjectSchema);


module.exports = {LatestProduct}