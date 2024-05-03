const complaintModel = require("../model/complaintModel.js");
const uploadCloudinary = require("../FileUpload/cloudinary");

const registerComplaint = async (req, res) => {
  // let file = req.file.originalname; for local file upload
  const id = req.user._id;
  let postedBy = req.body.postedBy;
  postedBy = id;

  // const pdfFile=req.file.path; //single pdf file upload through this
  // console.log(pdfFile);
  // const uploadpdf=await uploadCloudinary.uploadOnCloudinary(pdfFile);// function name uploadOnCloudinary created local file link sends
  // console.log(uploadpdf);
  const pdfFile1 = req.files?.idProofPdf?.[0]?.path; //multiple pdf image videos upload through this
  // const pdfFile2 = req.files?.writtenComplaint?.[0]?.path;

  const uploadpdf1 = await uploadCloudinary.uploadOnCloudinary(pdfFile1);
  // const uploadpdf2 = await uploadCloudinary.uploadOnCloudinary(pdfFile2);
  // console.log(req.body);
  // console.log(pdfFile1);
  // console.log(uploadpdf1);
  // console.log(pdfFile2);
  const {
    fullName,
    fatherName,
    email,
    phone,
    idProofNumber,
    address,
    description,
  } = req.body;

  if (
    !fullName ||
    !fatherName ||
    !email ||
    !phone ||
    !idProofNumber ||
    !address ||
    !description
  ) {
    return res.status(404).json({
      message: "Please enter full details",
      success: false,
    });
  }
  try {
    const data = await complaintModel.create({
      fullName,
      fatherName,
      email,
      phone,
      idProofNumber,
      address,
      description,
      access: false,
      postedBy,
      idProofPdf: uploadpdf1 ? uploadpdf1.url : "",
      // writtenComplaint: uploadpdf2.url,
    });
    return res.status(200).json({
      message: "complaint Registered",
      success: true,
      // data: data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error in register complaints",
      success: false,
    });
  }
};
const getAllComplaint = async (req, res) => {
  try {
    const allData = await complaintModel.find({});
    if (allData) {
      return res.status(200).json({
        message: "data fetch success",
        success: true,
        data: allData,
      });
    } else {
      return res.status(500).json({
        message: "complaint not fetch",
        successs: true,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "error in geeting complaint",
      success: false,
    });
  }
};
const updateComplaint = async (req, res) => {
  const { id } = req.params;

  try {
    const {
      fullName,
      fatherName,
      email,
      phone,
      idProofNumber,
      address,
      description,
    } = req.body;

    let data = await complaintModel.findById(id);
    if (!data) {
      return res.status(404).json({
        message: "complaint not found",
        success: false,
      });
    }

    const pdfFile1 = req.files?.idProofPdf?.[0]?.path; //multiple pdf image videos upload through this
    const uploadpdf1 = await uploadCloudinary.uploadOnCloudinary(pdfFile1);

    const complaintData = await complaintModel.findByIdAndUpdate(
      id,
      {
        fullName,
        fatherName,
        email,
        phone,
        idProofNumber,
        address,
        description,
        idProofPdf: uploadpdf1 && uploadpdf1.url,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    return res.status(200).json({
      message: "Complaint updated successfully",
      success: true,
      complaintData,
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      message: "Error in updating complaint",
      success: false,
    });
  }
};
const deleteComplaint = async (req, res) => {
  const { id } = req.body;
  let complaint = await complaintModel.findById(id);
  if (!complaint) {
    return res.status(404).json({
      message: "complaint not found",
      success: false,
    });
  }
  const datepre = new Date(complaint.createdAt);
  const datenow = new Date(Date.now());

  let difference = datenow - datepre;
  const millisecondsInDay = 1000 * 60 * 60 * 24 * 7;
  const daysDifference = Math.floor(difference / millisecondsInDay);

  const hoursDifference = Math.floor(
    (difference % millisecondsInDay) / (1000 * 60 * 60 * 24)
  );
  console.log(daysDifference);

  if (
    hoursDifference <= 7 &&
    !complaint.access &&
    complaint.status === "processing"
  ) {
    await complaint.deleteOne();
    return res.status(200).json({
      message: "Complaint Withdraw Success",
      success: true,
    });
  } else {
    return res.status(401).json({
      message: "Complaint cannot be withdraw",
      success: false,
    });
  }
};

// get a single complaint
const getComplaint = async (req, res) => {
  const { id } = req.params;
  // console.log("id = ", id);
  // console.log("params = ", req.params);

  try {
    const complaintData = await complaintModel.findById(id);

    if (complaintData) {
      return res.status(200).json({
        message: "Complain get successfully",
        success: true,
        data: complaintData,
      });
    } else {
      return res.status(404).json({
        message: "Complaint not found",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "error in fetch data",
      success: false,
    });
  }
};

const getUserComplaints = async (req, res) => {
  try {
    const complaintData = await complaintModel.find({ postedBy: req.user._id });
    if (complaintData) {
      return res.status(200).json({
        message: "Complain get successfully",
        success: true,
        data: complaintData,
      });
    } else {
      return res.status(404).json({
        message: "complaint not found",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "error in fetch data",
      success: false,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!complaintModel.schema.path("status").enumValues.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    statusupdate = await complaintModel.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
    let updatedstatus = statusupdate.status;
    return res.status(200).json({
      message: "status updated successfully",
      success: true,
      updatedstatus,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in status update",
      success: false,
    });
  }
};
const showStaus = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await complaintModel.findById(id);
    let status = data.status;
    return res.status(200).json({
      message: "Status fetched successfully",
      success: true,
      status,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      mesage: "error in status",
      success: false,
    });
  }
};
module.exports = {
  registerComplaint,
  getAllComplaint,
  updateComplaint,
  deleteComplaint,
  getUserComplaints,
  updateStatus,
  showStaus,
  getComplaint,
};
