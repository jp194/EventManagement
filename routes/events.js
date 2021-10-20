var express=require('express');
var Events=require('../models/Events');
var Users=require('../models/Users');
var auth=require('../middlewares/auth.js');
var router=express.Router();


// to get List of events created by the user and also to which the user is invited.

router.get('/',auth,(req,res,next)=>{
    const base64url = req.cookies.jwt.split(".")[1]; 
    const decodedValue= JSON.parse( Buffer.from(base64url, 'base64'));
     
    Users.findById(decodedValue._id)
    .then((user)=>{
        var eventList={
            created:user.created,
            invited:user.invited
        }
       
        res.send(eventList);
   }).catch((err)=>{ console.log(err);})
    
    
    })


// to get details of an event by passing its id in params.  
 router.get('/:eventId',(req,res,next)=>{
     Events.findById(req.params.eventId)
     .then((event)=>{
         res.send(event);
     })
     .catch((err)=>{ console.log(err);})
 })   
module.exports=router;