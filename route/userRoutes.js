const express = require("express");

const {registerController,loginController, getUserController, updateUserController, updatePasswordController} = require("../controller/userController");

// const authMiddleware = require("../middlewares/authMiddleware");
const {isauth} =require("../middlewares/authMiddleware");
// const {registerController,loginController}=require("../controller/userController");
const router = express.Router();

router.post("/register",registerController);

router.post("/login",loginController);

router.get("/getUser",isauth,getUserController);

router.put("/updateUser",isauth,updateUserController);

router.post("/updatePassword",isauth,updatePasswordController);

module.exports = router;