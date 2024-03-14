const complaintModel=require("../model/complaintModel.js");
const uploadCloudinary=require("../FileUpload/cloudinary");
const registerComplaint=async(req,res)=>{
    // let file = req.file.originalname; for local file upload
    const id=req.user._id;
    let postedBy=req.body.postedBy;
    postedBy=id;

    // const pdfFile=req.file.path; //single pdf file upload through this
    // console.log(pdfFile);
    // const uploadpdf=await uploadCloudinary.uploadOnCloudinary(pdfFile);// function name uploadOnCloudinary created local file link sends
    // console.log(uploadpdf);
    const pdfFile1=req.files.idProofPdf[0]?.path; //multiple pdf image videos upload through this
    const pdfFile2=req.files.writtenComplaint[0]?.path;
   
    const uploadpdf1=await uploadCloudinary.uploadOnCloudinary(pdfFile1);
    const uploadpdf2=await uploadCloudinary.uploadOnCloudinary(pdfFile2);
    console.log(uploadpdf2);
    const {fullName,fatherName,email,phone,idProofNumber,address,description,access}=req.body;
    
    if(!fullName||!fatherName||!email||!phone||!idProofNumber||!address||!description||!access)
    {
        return res.status(404).json({
            message:"please enter full details",
            success:false
        })
    }
    try{
        const data=await complaintModel.create({
            fullName,
            fatherName,
            email,
            phone,
            idProofNumber,
            address,
            description,
            access,
            postedBy,
            // idProofPdf:uploadpdf.url,
            idProofPdf:uploadpdf1.url,
            writtenComplaint:uploadpdf2.url
        })
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
const getComplaint=async(req,res)=>{
    try{
    const data=await complaintModel.find({});
    console.log(data);
    if(data){
        return res.status(400).json({
            message:"data fetch success",
            success:true
        })
    }
    else{
        return res.status(500).json({
            message:"complaint not fetch",
            successs:true
        })
    }
    }catch(err){
        return res.status(500).json({
            message:"error in geeting complaint",
            success:false
        })
    }
}
const updateComplaint=async(req,res)=>{
    const {id}=req.params;
    let data=await complaintModel.findById(id);
    if(!data)
    {
        return res.status(404).json({
            message:"complaint not found",
            success:false
        })
    }
    complaintData=await complaintModel.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    return res.status(200).json({
        message:"complaint updated successfully",
        success:true,
        complaintData
    })
}
module.exports={registerComplaint,getComplaint,updateComplaint};