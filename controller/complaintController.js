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
const getAllComplaint=async(req,res)=>{
    try{
    const allData=await complaintModel.find({});
    console.log(allData);
    if(allData){
        return res.status(400).json({
            message:"data fetch success",
            success:true,
            allData
        })
    }
    else{
        return res.status(500).json({
            message:"complaint not fetch",
            successs:true
        })
    }
    }catch(err){
        console.log(err);
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
const deleteComplaint=async(req,res)=>{
    const {id}=req.params;
    let complaint=await complaintModel.findById(id);
    if(!complaint)
    {
        return res.status(404).json({
            message:"complaint not found",
            success:false
        })
    }
    const datepre=new Date(complaint.createdAt);
    const datenow=new Date(Date.now());
    
    let difference=datenow-datepre;
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const daysDifference = Math.floor(difference / millisecondsInDay);
    const hoursDifference = Math.floor((difference % millisecondsInDay)/(1000 * 60 * 60));
    console.log(daysDifference);
    if(hoursDifference>6)
    {
        return res.status(401).json({
            message:"complaint cannot withdraw",
            success:false
        })
    }
    else{
        await complaint.deleteOne();
        return res.status(200).json({
            messgae:"Complaint Withdraw Success",
            success:true
        })
    }
}
const getComplaint=async(req,res)=>{
    try{
        const complaintData=await complaintModel.find({postedBy:req.user._id});
        if(complaintData){
        return res.status(200).json({
            message:"Complain get successfully",
            success:true,
            complaintData
        })
    }
    else{
        return res.status(404).json({
            message:"complaint not found",
            success:false
        })
    }
    }catch(err){
        return res.status(500).json({
            message:"error in fetch data",
            success:false
        })
    }
}

const updateStatus=async(req,res)=>{
    try{
        const {id}=req.params;
        const {status}=req.body;

        statusupdate=await complaintModel.findByIdAndUpdate(id,{status},{
            new:true
        })
        let updatedstatus=statusupdate.status;
        return res.status(200).json({
            message:"status updated successfully",
            success:true,
            updatedstatus
        })
    }catch(err){
        return res.status(500).json({
            message:"error in status update",
            success:false
        })
    }
}
const showStaus=async(req,res)=>{
    // const enumValues = complaintModel.schema.path('status').enumValues;
    // return res.status(200).json({
    //     message:"status fetched success",
    //     success:true,
    //     enumValues
    // })
    const {id}=req.params;
    try{
        const data=await complaintModel.findById(id);
        let status=data.status;
        return res.status(200).json({
            message:"status fetched successfully",
            success:true,
            status
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            mesage:"error in status",
            success:false
        })
    }
}
module.exports={registerComplaint,
    getAllComplaint,
    updateComplaint,
    deleteComplaint,
    getComplaint,
    updateStatus,
    showStaus,
};