const express = require("express");
const { isauth } = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  getUserController,
  updateUserController,
  updatePasswordController,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword,
} = require("../controller/userController");
const {
  hashPasswordMiddleware,
} = require("../middlewares/hashPasswordMiddleware");
const router = express.Router();

router.post("/register", hashPasswordMiddleware, registerController);
router.post("/login", loginController);

router.get("/getuser", isauth, getUserController);
router.put("/updateuser", isauth, hashPasswordMiddleware, updateUserController);
router.post("/updatepassword", isauth, updatePasswordController);
router.post("/forgotpassword", forgotPassword);
router.post("/verifyOTP", verifyOTP);
router.post("/resetpassword", hashPasswordMiddleware, resetPassword);

router.post("/logout", isauth, logout);
module.exports = router;
