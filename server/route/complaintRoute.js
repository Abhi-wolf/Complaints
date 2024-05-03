const express = require("express");
const {
  registerComplaint,
  getAllComplaint,
  updateComplaint,
  deleteComplaint,
  getComplaint,
  showStaus,
  updateStatus,
  getUserComplaints,
} = require("../controller/complaintController");
const { isauth } = require("../middlewares/authMiddleware");
const { isadmin } = require("../middlewares/adminMiddleware");
const router = express.Router();
const { up } = require("../middlewares/multerMiddleware");
const upload = require("../middlewares/multerMiddleware");
const {
  isAuthorized,
  isAdminOrUser,
} = require("../middlewares/adminOrUserMiddleWare");

router.post(
  "/register-complaint",
  isauth,
  upload.fields([{ name: "idProofPdf" }, { name: "writtenComplaint" }]),
  registerComplaint
);
router.patch(
  "/update-details/:id",
  isauth,
  upload.fields([{ name: "idProofPdf" }, { name: "writtenComplaint" }]),
  updateComplaint
);

router.get("/get-allcomplaint", isadmin, getAllComplaint);
// router.patch("/update-details/:id", isauth, updateComplaint);
router.delete("/delete-complaint", isauth, deleteComplaint);
router.get("/get-usercomplaints", isauth, getUserComplaints);
router.get("/get-complaint/:id", isAuthorized, isAdminOrUser, getComplaint);

router.get("/show-status/:id", showStaus);
router.put("/update-status/:id", isadmin, updateStatus);

module.exports = router;
