const express=require("express");
const { adminRegisterController, adminLoginController, adminLogout } = require("../controller/adminController");
const { isadmin } = require("../middlewares/adminMiddleware");

const router=express.Router();

router.post('/admin-register',adminRegisterController);
router.post('/admin-login',adminLoginController);

router.post('/admin-logout',isadmin,adminLogout);

module.exports=router;