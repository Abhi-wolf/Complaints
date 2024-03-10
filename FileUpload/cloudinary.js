// import {v2 as cloudinary} from "cloudinary";
const cloudinary=require("cloudinary");
const fs=require("fs");

cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
});
const uploadOnCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath)
        {
            return null;
        }
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file uploaded successfully
        console.log("file uploaded",response.url);
        return response;
    }catch(err){
        fs.unlinkSync(localFilePath);//remove the locally temporary file at localstorage
        return null;
    }
}
module.exports={uploadOnCloudinary};