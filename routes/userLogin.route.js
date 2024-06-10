const jwt = require('jsonwebtoken');
 const userlogin = require("express").Router()
const {userModel} = require("../model/UserSchema")
const bcrypt = require("bcrypt");
const { SECRET_KEY } = require('../secret');
 userlogin.post("/register", async(req,res)=>{
    try {
        const {username,password} = req.body;
    const user = await userModel.findOne({username: username});
    if(user) return res.send("user alredy exists ");

    bcrypt.hash(password,10, async(err,hash)=>{
        const newUser = new userModel({
            username: username,
            password: hash
        })

        await newUser.save().then((user)=>{
            res.send({
                message:true,
                username: user.username
            })
        }).catch(err =>{
            res.status(401).send({
                success : false,
                message : "user is not created"
            })
        })
    })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message
        })
    }

 })


 userlogin.post("/login", async(req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.findOne({username: username});
    
    if(!user) return res.status(401).send({
        success:false,
        message: "user s not found"
    });

    if(!bcrypt.compareSync(password, user.password))return res.status(401).send({
        success: false,
        message : "Incorrect password"
    })

    const payload= {
        id : user._id,
        username: user.username
    }
   const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1d"
   })


   return res.status(200).send({
    success:true,
    message: "user is logged in successfully",
    token: "Bearer "+token 
   })



 })




 module.exports = {userlogin}