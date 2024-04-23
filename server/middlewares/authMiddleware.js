const jwt = require("jsonwebtoken");
const user = require("../model/userModel");

const isauth = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    // console.log("authHeader :", authHeader);

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    // console.log("token = ", token);

    if (!token || token === undefined) {
      return res.status(400).json({
        message: "Token not found/Unauthorized user",
        success: true,
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decode.id);
    next();
  } catch (err) {
    console.log(err);
  }
};
module.exports = { isauth };
