// import {v2 as cloudinary} from "cloudinary";
const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const uploadOnCloudinary = async (localFilePath) => {
  var mainFolderName = "files";
  var filePathOnCloudinary = mainFolderName + "/" + localFilePath;
  try {
    if (!localFilePath) {
      return null;
    }
    console.log(localFilePath);
    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        public_id: filePathOnCloudinary,
        transformation: {
          width: "auto", // Adjust width as needed
          height: "auto", // Adjust height as needed
          crop: "fit", // Optional: Adjust crop mode if needed
        },
      },
      {
        resourceType: "auto",
      }
    );
    //file uploaded successfully
    console.log("file uploaded", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath); //remove the locally temporary file at localstorage
    return null;
  }
};
module.exports = { uploadOnCloudinary };
