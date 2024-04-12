const adminModel=require('../model/adminModel');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const adminRegisterController=async(req,res)=>{
    try{
        const {email,name,phone,idProof,password}=req.body;
        if(!name || !email || !phone || !idProof || !password)
        {
            return res.status(500).send({
                success: false,
                message: "Please Provide All Fields",
            });
        }
        const existing=await adminModel.findOne({email:email});
        if(existing)
        {
            return res.status(400).json({
                message:"already registered",
                success:true
            })
        }
        let hashPassword = await bcrypt.hash(password,10);
        const user = await adminModel.create({
            name, 
            email,
            phone,
            idProof,
            password:hashPassword, 
      });
      return res.status(200).json({
        message:"admin registered successfully",
        success:true
      })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"error in registering",
            success:false
        })
    }
} 
const adminLoginController=async(req,res)=>{
    try{
    const {email,password}=req.body;

    const user=await adminModel.findOne({email:email});
    if(!user)
    {
        return res.status(400).json({
            messgae:"user not found",
            success:false
        })
    }
    let compare=await bcrypt.compare(password,user.password);
    if(!compare)
    {
        return res.stauts(401).json({
            message:"credentials donot match",
            success:false
        })
    }
    const payload={
        email:user.email,
        id:user._id
    }
    let token = jwt.sign(payload,process.env.JWT_SECRET, {
        expiresIn:"1d",
    });
    const options={
        expires:new Date(Date.now()+3*24*60*60*1000),
        httpOnly:true,
    }
    return res.cookie("admintoken",token,options).status(200).json({
        message:"admin login successful",
        token,
        success:true
      })
    }catch(err){
        return res.status(500).json({
            message:"error in login",
            success:false
        })
    }
}

const adminLogout=async(req,res)=>{
    return res.status(201).cookie("admintoken","",{
      httpOnly:true,
      expires:new Date(Date.now()+3*24*60*60*1000),
    }).json({
        message:"logout successful!",
        success:true
    });
}
module.exports={adminRegisterController,adminLoginController,adminLogout};