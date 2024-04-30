const saltRounds = 10;
const bcrypt = require("bcryptjs");

const hashPasswordMiddleware = async (req, res, next) => {
  try {
    const { password } = req.body;
    console.log("pass = ", password);
    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log("hased pass = ", hashedPassword);
      req.body.password = hashedPassword;
      next();
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { hashPasswordMiddleware };
