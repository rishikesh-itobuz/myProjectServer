import validator from "validator";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

//user sign-up

export const userSignUp = async (request, response, next) => {
  const { email, phone, password, cPassword } = request.body;

  
  if (!email || !phone || !password || !cPassword) {
    response.status(400);
    return next(new Error("All fields are necessary "));
  }
  if (!validator.isEmail(email)) {
    response.status(401);
    return next(new Error("Invalid email !"));
  }
  if(!validator.isMobilePhone(phone)){
    response.status(401);
    return next(new Error("Invalid phone number !"));
  }
  // if(!validator.isStrongPassword(password)){
  //   response.status(401);
  //   return next(new Error("Please provide a strong password !"));
  // }
  const user = await User.findOne({ email });
  if (user) {
    response.status(401);
    return next(new Error("Email already registered"));
  }
  if (password !== cPassword) {
    response.status(401);
    return next(new Error("Password not matched!"));
  } else {
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        console.log(err);
      } else {
        const userData = new User({
          email,
          phone,
          password: hash,
          cPassword: hash,
        });

        try {
          await userData.save();
          response.status(200).json({
            data: null,
            message: "User added Successfully",
            success: true,
          });
        } catch (error) {
          response.status(400);
          console.log(error);
          next(new Error(error._message));
        }
      }
    });
  }
};

//user login

export const userLogin = async(request,response,next)=>{
  const {email,password} = request.body;
  if (!email || !password ) {
    response.status(400);
    return next(new Error("All fields are necessary "));
  }
  if (!validator.isEmail(email)) {
    response.status(401);
    return next(new Error("Invalid email !"));
  }
  const user = await User.findOne({ email });

  if(user && await bcrypt.compare(password,user.password)){

    const accesstoken = await jwt.sign({
      userData:{
        email:user.email,
        phone:user.phone,
        id:user._id

      }
    },process.env.SECRET_ACCESS_TOKEN ,{
      expiresIn:"1d"
    })
   
    response.status(200).json({data:{
      accesstoken
    },
    message:"Login successfull",
    success:true
  })
      
  }
  else{
    response.status(401);
    next(new Error("Invalid email or password"))
  }

}
