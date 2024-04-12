const admin = require("../model/adminModel");
const jwt = require("jsonwebtoken");
const isadmin = async (req, res, next) => {
  try {
    const { admintoken } = req.cookies;

    if (!admintoken) {
      return res.status(404).json({
        message: "Token not found / Unauthorized access",
        success: false,
      });
    }
    const decode = jwt.verify(admintoken, process.env.JWT_SECRET);
    req.admin = await admin.findById(decode.id);
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "error in middleware",
      success: false,
    });
  }
};
module.exports = { isadmin };
