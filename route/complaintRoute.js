const express=require("express");
const { registerComplaint } = require("../controller/complaintController");
const {isauth } = require("../middlewares/authMiddleware");

const router=express.Router();
router.post('/complaint',isauth,registerComplaint);
module.exports=router;