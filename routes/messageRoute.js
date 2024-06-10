const { messageModel } = require("../model/messageSchema");

const postMessageRouter = require("express").Router();
const getMessageRouter = require("express").Router();


getMessageRouter.get("/message", async(req,res)=>{
    const allMessage = await messageModel.find();
    res.status(200).send(allMessage)
})
postMessageRouter.post("/message",async(req,res)=>{
    const {name,email,message} = req.body;
    const newMessage = new messageModel({
        name: name,
        email: email,
        message:message
    })

    await newMessage.save().then((message)=>{
        res.status(201).send({
            success: true,
            message: {
                name: message.name,
                email:message.email
            }
        })
    }).catch((err)=>{
        console.log("message is not send")
    })
    
})


module.exports ={postMessageRouter,getMessageRouter}