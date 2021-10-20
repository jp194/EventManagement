const express=require('express');
const router=express.Router();
const Users=require('../models/Users');
var auth=require('../middlewares/auth.js');
const bycrpt=require('bcryptjs');


// update the password and again store it in database by hashing it through bycrptjs.
router.post('/',auth,async (req,res,next)=>{

    password=await bycrpt.hash(req.body.newPassword,12);
    
    const base64url = req.cookies.jwt.split(".")[1]; 
    const decodedValue= JSON.parse( Buffer.from(base64url, 'base64'));
     
     
    Users.findByIdAndUpdate(decodedValue._id,{password:password,cpassword:password})
    .then((user)=>{
       res.status(200).json("Updated password");
    })
    .catch((err)=>{
        console.log(err);
    })
   
   
  });
  
     
     module.exports = router;
  
  