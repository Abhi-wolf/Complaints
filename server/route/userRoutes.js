const express = require("express");

const {registerController,loginController, getUserController, updateUserController, updatePasswordController, logout} = require("../controller/userController");

// const authMiddleware = require("../middlewares/authMiddleware");
const {isauth} =require("../middlewares/authMiddleware");
// const {registerController,loginController}=require("../controller/userController");
const router = express.Router();

router.post("/register",registerController);
router.post("/login",loginController);

router.get("/getuser",isauth,getUserController);
router.put("/updateuser",isauth,updateUserController);
router.post("/updatepassword",isauth,updatePasswordController);

router.post('/logout',isauth,logout);
module.exports = router;