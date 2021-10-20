const express=require('express');
const router=express.Router();
const Users=require('../models/Users');

router.post('/',(req,res,next)=>{
  console.log(req.body);
    const {name,email,password,cpassword}=req.body;
    
   if(!name ||!email || !password || !cpassword) {
    return res.status(400).json("Please enter all details");
   }

 
  Users.findOne({email:email})
  .then((user)=>{
       if(user){
        return res.status(400).json("User already exists.");
       }
       if(password != cpassword){
        return res.status(400).json("Invalid information.");
       }
       const us=new Users({name,email,password,cpassword });
      
     us.save().then((user)=>{

   res.status(200).json("Registeration Successfull");   
     }).catch((err)=>{console.log(err);})
     
  }).catch((err)=>{console.log(err);})
     
});

   
   module.exports = router;

