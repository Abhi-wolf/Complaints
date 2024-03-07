const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//function for register the user:
const registerController = async(req,res)=> {
    try {
        
        //sara data pahle le lena h:
        const { name, email, phone, password,userid} = req.body;

        //validation of the user:
        if( !name || !email || !phone || !password || !userid)
        {
            return res.status(500).send({
                success: false,
                message: "Please Provide All Fields",
            });
        }

        //check the user properly through their emailid and password:
        const exisiting = await userModel.findOne({ email:email});

        if (exisiting) 
        {
            return res.status(500).send({
                success: false,
                message: "Email Already Registerd please Login dont again login",
            });
        }
    
        //Hashing the user password:
        // const salt = bcrypt.genSaltSync(10);

        // salt is used for number of times of encryption: 
        let hashPassword = await bcrypt.hash(password,10);

        // create a new user:
        const user = await userModel.create({
            name, 
            email,
            phone,
            password:hashPassword,
            userid,
      });
    
      console.log(user);

      //if user created successfully:
      return res.status(201).send({
        success: true,
        message: "User is Successfully Registered",
        user,
      });

    } catch (error) {
        console.log(error);

        return res.status(500).send({
        success: false,
        message: "Error In Register API",
        error,
    });
    }
}


const loginController = async(req,res) =>{
    try {
        const {email, password,role} = req.body

        //validification of the user:
        if(!email || !password || !role)
        {
          return res.status(500).send({
            success:false,
            message:"Please Provide Email Or Password"
          })
        }
        //check user:
        const user = await userModel.findOne({email});
        if(!user)
        {
            return res.status(404).send({
              success:false,
              message:"user not found",
            });
        }
        if(user.role!==role)
        {
                return res.status(500).json({
                    message:"user role doesnot match",
                    success:"false"
                })
        }
        // check user password || compare password:
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
          return res.status(500).send({
            success:false,
            message:"Invalid credentials",
          });
        }
        const payload={
          email:user.email,
          id:user._id,
          role:user.role
        }
        //for encrypt-> we use sign.
        //for decrypt-> we use verify.
        const jwtsecret="atish";
        let token = jwt.sign(payload,jwtsecret, {
          expiresIn:"1d",
        });

        console.log("token is : ",token);
        const options={
          expires:new Date(Date.now()+3*24*60*60*1000),
          httpOnly:true,
      }
        res.cookie("token",token,options).status(200).json({
          message:"login successful",
          token,
          success:true
        })
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success:false,
        message:"Error in Login API",
        error
      })
    }

}


//function for get the user data:
const getUserController = async(req,res) => {
  try {

      //first  find the user:
      const user = await userModel.findById({_id:req.body.id});

      //validation of the user , if not then return error:
      if(!user)
      {
          return res.status(404).send({
              success:false,
              message:"User Not Found",
          });
      }

      console.log(user);

      //send response:
      res.status(200).send({
          success:true,
          message:"User get Successfully",
          user,
      })
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success:false,
          message:"Error in Get User API",
          error
      })
  }
};


//for update the user data:
const updateUserController = async(req,res) =>{
  try {
      // first  find the user:
      const user = await userModel.findById({_id: req.body.id});

      //validation of the user:
      if(!user)
      {
          return res.status(404).sned({
              success:false,
              message:"User Not found"
          });
      }

      // after then update the user data:
      const {name,email,phone} = req.body;

      if(name){
          user.name = name; 
      }
      if(email){
          user.email = email;
      }
      if(user.phone){
          user.phone = phone;
      }

      //save the updated user data :
      await user.save();

      console.log(user);
      
      res.status(200).send({
          success:true,
          message:"User Updated Successfully"
      })
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success:false,
          message:"Error in Updated User API",
          error,
      });
  }
};


// function for update user password : 
const updatePasswordController = async (req, res) => {
  try {

    // first  find the user:
    const user = await userModel.findById({ _id: req.body.id });

    //validation of the user:
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // get data from the user (user ko old aur new password dalna hoga tabhi password upddate hoga):
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) 
    {
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


//function for reset the password:
const resetPasswordController = async(req,res) =>{
  try {
      const {email, newPassword} = req.body;

      if(!email || !newPassword){
          return res.status(500).send({
              success:false,
              message:"Please Provide ALl fields"
          });
      };

      const user = await userModel.findOne({email});

      if(!user)
      {
          return res.status(500).send({
              success:false,
              message:"User Not Found or Invalid answer"
          });
      }

      //hashing password:
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword,salt);

      user.password = hashedPassword;

      await user.save();

      res.status(200).send({
          success:true,
          message:"Password reset successfully",
      })
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success:false,
          message:"Error in Password Reset API",
          error,
      })
  };
}


//DELETE PROFILE ACCOUNT:
const deleteProfileController = async(req,res) =>{
  try {
      const id = req.params.id;
      const user = await userModel.findByIdAndDelete(id);

      console.log("delete user is : ",user);
      return res.status(200).send({
          success:true,
          message:"Your account has been deleted",
      });

  } catch (error) {
      console.log(error);
      res.status(500).send({
          success:false,
          message:"Error In Delete Profile API",
          error,
      });
  }
}

module.exports = {registerController,loginController,getUserController,updateUserController,updatePasswordController,deleteProfileController,resetPasswordController};