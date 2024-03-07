const complaintModel=require("../model/complaintModel.js");

const registerComplaint=async(req,res)=>{
    const id=req.user._id;
    req.body.postedBy=id;
    const {fullName,fatherName,email,phone,idProofNumber,address,description,access}=req.body;
    
    if(!fullName||!fatherName||!email||!phone||!idProofNumber||!address||!description||!access)
    {
        return res.status(404).json({
            message:"please enter full details",
            success:false
        })
    }
    try{
        const data=new complaintModel(req.body);
        data.save();
        return res.status(200).json({
            message:"complaint Registered",
            success:true
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"error in register complaints",
            success:false
        })
    }
}
module.exports={registerComplaint};