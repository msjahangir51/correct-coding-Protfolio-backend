const express = require("express");
const {GetProductRouter,ProductRouter} = require("./routes/Product.Route");
const cors = require("cors");
const { LatestProduct } = require("./model/ProjectsSchema");
const { userlogin } = require("./routes/userLogin.route");
const passport = require("passport");
const { postMessageRouter, getMessageRouter } = require("./routes/messageRoute");
const app = express();
// initialize
const corsOptions ={
    origin: "*", 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("uploads"))
app.use(passport.initialize())
require("./config/passport")
// end of initialize

app.get("/",async (req,res)=>{
    const project = await LatestProduct.find();
    res.send(project)
})
app.use("/get",GetProductRouter)
app.use("/post",ProductRouter)
app.use("/post",userlogin)
app.use("/post",postMessageRouter)
app.use("/api",getMessageRouter)
app.get("/profile",passport.authenticate('jwt', { session: false }),(req,res)=>{
    return res.status(200).send({
        success: true,
        user: {
            id: req.user._id,
            username: req.user.username

        }
    })
})
app.use((req,res,next)=>{
    res.send("invalid route")
});

app.use((err,req,res)=>{
    res.status(500).send("something broke")
})

module.exports = {app}