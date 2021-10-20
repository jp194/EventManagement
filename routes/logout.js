var express=require('express');
var router=express.Router();


router.get('/',(req,res,next)=>{
    res.clearCookie('jwt');
    res.status(200).json("Logged out.");
})

module.exports=router;