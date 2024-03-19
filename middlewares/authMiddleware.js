const jwt=require("jsonwebtoken");
const user=require("../model/userModel");
const isauth=async(req,res,next)=>{
    try{
    const {token}=req.cookies;
    console.log(token);
    if(!token)
    {
        return res.status(400).json({
            message:"token not found/unauthorised user",
            success:true
        })
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await user.findById(decode.id);
        next();
    }catch(err){
        console.log(err);
    }
}
module.exports={isauth};