const express = require("express");
const {
  adminRegisterController,
  adminLoginController,
  adminLogout,
  updateAdminController,
  getAdminController,
  getAllUsers,
} = require("../controller/adminController");
const { isadmin } = require("../middlewares/adminMiddleware");
const {
  hashPasswordMiddleware,
} = require("../middlewares/hashPasswordMiddleware");

const router = express.Router();

router.post("/admin-register", hashPasswordMiddleware, adminRegisterController);
router.put(
  "/updateAdmin",
  isadmin,
  hashPasswordMiddleware,
  updateAdminController
);
router.post("/admin-login", adminLoginController);
router.post("/admin-logout", isadmin, adminLogout);
router.get("/getAdmin", isadmin, getAdminController);
router.get("/getAllUsers", isadmin, getAllUsers);

module.exports = router;
