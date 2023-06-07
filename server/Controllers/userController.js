// import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
// import { User } from "../Models/User.js";
// import ErrorHandler from "../Utils/errorHandler.js";
// import { sendToken } from "../Utils/sendToken.js";

// export const register = catchAsyncError(async (req, res, next) => {
//   const { name, email, password } = req.body;

//   // const file = req.file;
//   if (!name || !email || !password)
//     return next(new ErrorHandler("Please enter all fields", 400));

//   let user = await User.findOne({ email });

//   if (user) return next(new ErrorHandler("User Already Exist!", 409));

//   //   Upload file on cloudinary

//   user = await User.create({
//     name,
//     email,
//     password,
//     avatar: {
//       public_id: "tempId",
//       url: "tempUrl",
//     },
//   });
//   sendToken(res, user, "Registered successfully", 201);
// });

// export const login = catchAsyncError(async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return next(new ErrorHandler("Please enter all fields", 400));

//   const user = await User.findOne({ email }).select("+password");

//   if (!user) return next(new ErrorHandler("Incorrect Email or Password!", 401));

//   const isMatch = await user.comparePassword(password);

//   if (!isMatch)
//     return next(new ErrorHandler("Incorrect Email or Password!", 401));

//   sendToken(res, user, `Welcome back, ${user.name}`, 200);
// });

// export const logout = catchAsyncError(async (req, res, next) => {
//   console.log(req.user._id);
//   res
//     .status(200)
//     .cookie("token", null, {
//       expires: new Date(Date.now()),
//       httpOnly: true,
//     })
//     .json({
//       success: true,
//       message: "Logout successfully",
//     });
// });
// export const getMyProfile = catchAsyncError(async (req, res, next) => {
//   // const user = await User.findById(req.user._id);
//   const userId = req.user._id;
//   console.log(userId);
//   res.status(200).json({
//     success: true,
//     message: userId,
//   });
// });

import { User } from "../Models/User.js";
import ErrorHandler from "../Utils/errorHandler.js";
import { sendToken } from "../Utils/sendToken.js";
import { catchAssyncError } from "../Middlewares/catchAsyncError.js";
import { sendEmail } from "../Utils/sendEmail.js";
import crypto from "crypto";

export const register = catchAssyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(
      new ErrorHandler("User already exist with this email address", 409)
    );
  }
  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "tempId",
      url: "tempUrl",
    },
  });
  sendToken(res, user, "Registered successfully", 201);
});

export const login = catchAssyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Incorrect email or password", 401));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect email or password", 401));
  }
  sendToken(res, user, `Welcome back ${user.name}`, 200);
});

export const logout = catchAssyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged Out Successfully!",
    });
});

export const getMyProfile = catchAssyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const changePassword = catchAssyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("Please enter all fields!", 401));
  let user = await User.findById(req.user._id).select("+password");
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect old password!", 401));
  }
  user.password = newPassword;
  user.save();
  res.status(201).json({
    success: true,
    message: "Password Changed Successsfully.",
  });
});

export const updateProfile = catchAssyncError(async (req, res, next) => {
  const { name, email } = req.body;
  if (!name && !email)
    return next(
      new ErrorHandler("Please enter a field if you want to update one!")
    );
  let user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;

  user.save();
  res.status(201).json({
    success: true,
    message: "Profile Updated Successsfully.",
  });
});

export const updateProfilePic = catchAssyncError(async (req, res, next) => {
  const { name, email } = req.body;
  if (!name && !email)
    return next(
      new ErrorHandler("Please enter a field if you want to update one!")
    );
  let user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) user.email = email;

  user.save();
  res.status(201).json({
    success: true,
    message: "Profile Updated Successsfully.",
  });
});
export const forgotPassword = catchAssyncError(async (req, res, next) => {
  const { email } = req.body;
  if (!email)
    return next(new ErrorHandler("Please enter your email password."), 401);
  const user = await User.findOne({ email });
  const resetToken = await user.getResetToken(user);
  // Send token via email
  const link = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  const text = `Click on the link to reset password: ${link}. Ignore if you did not requested.`;
  await sendEmail(user.email, "Coursebook Reset Password Token", text);
  res.status(200).json({
    success: true,
    message: `Reset token has sent to ${user.email}`,
  });
});

export const resetPassword = catchAssyncError(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user)
    return next(new ErrorHandler("Token is invalid or has expired!", 409));
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password changed successfully.",
  });
});
