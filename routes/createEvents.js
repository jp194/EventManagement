var express=require('express');
var Events=require('../models/Events');
const Users = require('../models/Users');
var auth=require('../middlewares/auth.js');
var router=express.Router();


router.post('/',auth,(req,res,next)=>{

   // create an event. 
   Events.create(req.body)
   .then((event)=>{
    
    // get the user id stored in cookies and convert it to JSON (user Authorization)
    const base64url = req.cookies.jwt.split(".")[1]; 
    const decodedValue= JSON.parse( Buffer.from(base64url, 'base64'));
     
    Users.findById(decodedValue._id)
    .then((user)=>{

     // after finding user we update the createdBy attribute of event to the user.   
     event.createdBy=user.email;

     // here we push the event in the created array of the user. 
     Users.findByIdAndUpdate(decodedValue._id,{
        $push:{created:event.name}
    })
    .then((user)=>{
       
        event.invites.map((ev)=>{

           // we map through the invites array of event and then find those in Users document and update the invited array of that user. 
           Users.findOneAndUpdate({email:ev},{
            $push:{invited:event.name}
           })
           .then((invite)=>{
               res.status(200).json("Created Event.");  
           }).catch((err)=>{console.log(err)})
        })
        
    }).catch((err)=>{console.log(err)})
    
     }).catch((err)=>{console.log(err)})

      
   })
   .catch((err)=>{
       console.log(err);
   })
})

module.exports=router;



 
 

