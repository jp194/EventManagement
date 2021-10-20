const mongoose=require('mongoose');
const validator=require('validator');
const bycrpt=require('bcryptjs');

const Schema = mongoose.Schema;

const EventSchema=new Schema({
    name:{
      type:String,
      required:true 
    },
    
    Date:{
        type:Date,
        required:true
    },
    createdBy:{
        type:String,
       
    },
    invites:[{
        type:String
    }]
    
});
var Events= mongoose.model('Event',EventSchema);

module.exports=Events;