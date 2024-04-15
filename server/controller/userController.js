const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
//function for register the user:
const registerController = async (req, res) => {
  try {
    //sara data pahle le lena h:
    const { name, email, phone, password, userid } = req.body;

    console.log(
      "name:",
      name,
      " email: ",
      email,
      " phone: ",
      phone,
      " userid: ",
      userid,
      " password: ",
      password
    );

    //validation of the user:
    if (!name || !email || !phone || !password || !userid) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    //check the user properly through their emailid and password:
    const exisiting = await userModel.findOne({ email: email });

    if (exisiting) {
      return res.status(500).send({
        success: false,
        message: "Email Already in use. Try with different email",
      });
    }

    //Hashing the user password:
    // const salt = bcrypt.genSaltSync(10);

    // salt is used for number of times of encryption:
    let hashPassword = await bcrypt.hash(password, 10);

    // create a new user:
    const user = await userModel.create({
      name,
      email,
      phone,
      password: hashPassword,
      userid,
    });

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "31golu.s@gmail.com", // your email
        pass: "gzem eiqq lmiw rbqe", // your password
      },
    });
    let toEmail = req.body.email;
    let mailOptions = {
      from: "31golu.s@gmail.com", // sender address
      to: toEmail, // list of receivers
      subject: "Welcome to our website!", // Subject line
      html: `<p> Dear ${name} <br> Thank you for registering on our website!</p>`, // HTML body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    //if user created successfully:

    return res.status(201).send({
      success: true,
      message: "User is Successfully Registered",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    var { email, password } = req.body;

    //validification of the user:
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email Or Password",
      });
    }
    //check user:
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    // check user password || compare password:
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid credentials",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
    };
    //for encrypt-> we use sign.
    //for decrypt-> we use verify.
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("token is : ", token);
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    var { email, name, userid } = user;

    res.cookie("token", token, options).status(200).json({
      message: "login successful",
      data: { email, name, userid },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

const getUserController = async (req, res) => {
  try {
    //first  find the user:
    const user = await userModel.findById({ _id: req.user.id });

    //validation of the user , if not then return error:
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    console.log(user);

    //send response:
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    // first  find the user:
    const { id } = req.user;
    let user = await userModel.findById({ _id: id });

    //validation of the user:
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not found",
      });
    }
    userData = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return res.status(200).json({
      message: "update successful",
      success: true,
      userData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "error in updating",
      success: false,
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    // first  find the user:
    const user = await userModel.findById({ _id: req.user.id });

    //validation of the user:
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // get data from the user (user ko old aur new password dalna hoga tabhi password upddate hoga):
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New PasswOrd",
      });
    }

    //check user password  | compare password:
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    console.log(user);

    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};

const logout = async (req, res) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    })
    .json({
      message: "logout successful!",
      success: false,
    });
};
module.exports = {
  registerController,
  loginController,
  getUserController,
  updateUserController,
  updatePasswordController,
  logout,
};
