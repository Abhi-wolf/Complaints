const express=require("express");
const { registerComplaint, getAllComplaint, updateComplaint, deleteComplaint, getComplaint, showStaus, updateStatus } = require("../controller/complaintController");
const {isauth } = require("../middlewares/authMiddleware");
const {isadmin}=require("../middlewares/adminMiddleware");
const router=express.Router();
// const complaintModel=require("../model/complaintModel");
// const multer  = require('multer');

// const fs = require('fs');
const {up } = require("../middlewares/multerMiddleware");
const upload = require("../middlewares/multerMiddleware");

// const destination = './temp';

// if (!fs.existsSync(destination)) {
//   fs.mkdirSync(destination);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, destination);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   }
// });
// const upload = multer({ storage: storage });
// router.post('/complaint',isauth,upload.single("idProofPdf"),registerComplaint);

// router.post('/complaint',isauth,upload.single("idProofPdf"),registerComplaint);
router.post('/complaint', isauth, upload.fields([{ name: 'idProofPdf' },{ name: 'writtenComplaint' }]),registerComplaint);

router.get('/get-allcomplaint',isadmin, getAllComplaint);
router.put('/update-details/:id',isauth,updateComplaint);
router.delete('/delete-complaint/:id',isauth,deleteComplaint);
router.get("/get-complaint",isauth,getComplaint);

router.get('/show-status/:id',showStaus);
router.put('/update-status/:id',isadmin,updateStatus);

module.exports=router;