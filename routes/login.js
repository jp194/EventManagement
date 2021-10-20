const express=require('express');
const Users = require('../models/Users');
const bycrpt=require('bcryptjs');
const router=express.Router();
const jwt=require('jsonwebtoken');



router.post('/',(req,res,next)=>{
   const {email,password}=req.body;

   if(!email || !password){
       res.status(400).json("Please enter all feilds");
   }

   Users.findOne({email:email})
   .then((userLogin)=>{
       if(!userLogin){
       return res.status(400).json("Invalid Credentials.");
       }
     bycrpt.compare(password,userLogin.password)
     .then((isMatch)=>{
         if(isMatch){
            
            const token=jwt.sign({_id:userLogin._id},process.env.secretKey);

            res.cookie("jwt",token,{ 
               expires:new Date(Date.now() + 24*60*60*1000)});
        
          res.status(200).json("Logged in");
         }else{
            res.status(400).json("Invalid Credentials.");
         }

     })  .catch((err)=>{ console.log(err);})
   
   }).catch((err)=>{ console.log(err);})
});
module.exports = router;
