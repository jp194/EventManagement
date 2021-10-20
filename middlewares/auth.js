const jwt = require('jsonwebtoken');

const auth= (req,res,next)=>{
   
    const token=req.cookies.jwt;

    if(!token){
        res.status(400).json("Please login to your account");
    }else{
       
        try{
        const tk=jwt.verify(token, process.env.secretKey);
        next();
        }catch(err){
            return res.status(401).send("Invalid Token");
        }
    }
}

module.exports=auth;