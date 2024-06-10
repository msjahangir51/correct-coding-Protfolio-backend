const { default: mongoose } = require("mongoose");
const { MONGODB_URL } = require("../secret");
const mongodbConnection =()=>{
    mongoose.connect(MONGODB_URL).then(()=>{
        console.log("db is connected")
    }).catch(err=>{
        console.log(err)
    })

}


module.exports = mongodbConnection