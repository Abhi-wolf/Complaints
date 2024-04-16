const jwt = require("jsonwebtoken");

const isAuthorized = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    // console.log("authHeader admin or user :", authHeader);

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    // console.log("token admin or user = ", token);

    if (!token || token === undefined) {
      return res.status(400).json({
        message: "Token not found/Unauthorized user",
        success: true,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
  }
};

const isAdminOrUser = async (req, res, next) => {
  //   console.log("res.user = ", req.user);
  const userRole = req.user.role;
  //   console.log("userroel = ", userRole);

  if (userRole === "admin" || userRole === "user") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};
module.exports = { isAuthorized, isAdminOrUser };
