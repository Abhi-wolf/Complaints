const adminModel = require("../model/adminModel");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminRegisterController = async (req, res) => {
  try {
    const { email, name, phone, idProof, password, role } = req.body;
    if (!name || !email || !phone || !idProof || !password || !role) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    if (role !== "admin")
      return res
        .status(404)
        .json({ success: false, message: "Please define the role" });

    const existing = await adminModel.findOne({ email: email });
    if (existing) {
      return res.status(400).json({
        message: "already registered",
        success: true,
      });
    }
    // let hashPassword = await bcrypt.hash(password, 10);
    const user = await adminModel.create({
      name,
      email,
      phone,
      idProof,
      password,
      role,
    });
    return res.status(200).json({
      message: "admin registered successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "error in registering",
      success: false,
    });
  }
};
const adminLoginController = async (req, res) => {
  try {
    var { email, password, role } = req.body;

    if (role !== "admin")
      return res
        .status(404)
        .json({ success: false, message: "Unauthorized access" });

    const user = await adminModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const compare = await bcrypt.compare(password, user.password);

    console.log("password match = ", compare);

    if (!compare) {
      return res.status(401).json({
        message: "Credentials do not match",
        success: false,
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const options = {
      withCredentials: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: false,
    };

    var { email, name, _id: id, role } = user;

    return res.cookie("token", token, options).status(200).json({
      message: "Admin login successful",
      data: { email, name, id, role, token },
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error in login",
      success: false,
    });
  }
};

const adminLogout = async (req, res) => {
  return res
    .status(201)
    .cookie("admintoken", "", {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    })
    .json({
      message: "logout successful!",
      success: true,
    });
};

const getAdminController = async (req, res) => {
  try {
    //first  find the user:
    const user = await adminModel
      .findById({ _id: req.admin.id })
      .select("-password");

    //validation of the user , if not then return error:
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

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
      message: "Error in Get admin API",
      error,
    });
  }
};

const updateAdminController = async (req, res) => {
  try {
    // first  find the user:
    const { id } = req.admin;
    const user = await adminModel.findById({ _id: id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not found",
      });
    }
    const updatedUser = await adminModel
      .findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      })
      .select("-password");

    return res.status(200).json({
      message: "update successful",
      success: true,
      updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "error in updating",
      success: false,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    //first  find the user:
    const allUsers = await userModel.find().select("-password");
    const admins = await adminModel.find().select("-password");

    //validation of the user , if not then return error:
    if (!allUsers && !admins) {
      return res.status(404).send({
        success: false,
        message: "No user Found",
      });
    }

    const users = [...allUsers, ...admins];
    console.log(users);

    //send response:
    res.status(200).send({
      success: true,
      message: "Successfull",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get user API",
      error,
    });
  }
};

module.exports = {
  adminRegisterController,
  adminLoginController,
  adminLogout,
  getAdminController,
  updateAdminController,
  getAllUsers,
};
