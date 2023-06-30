import { User } from "../Models/User.js";
import { Course } from "../Models/Course.js";
import ErrorHandler from "../Utils/errorHandler.js";
import { sendToken } from "../Utils/sendToken.js";
import { catchAssyncError } from "../Middlewares/catchAsyncError.js";
import { sendEmail } from "../Utils/sendEmail.js";
import crypto from "crypto";
import getDataUri from "../Utils/dataURI.js";
import cloudinary from "cloudinary";
import { Stats } from "../Models/Stats.js";

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
  //   Upload file on cloudinary
  const file = req.file;
  const fileURI = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileURI.content);
  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
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
  const file = req.file;
  if (!file)
    return next(new ErrorHandler("Please Select A File To Update Profile Pic"));
  let user = await User.findById(req.user._id);

  const fileURI = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileURI.content);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  user.save();
  res.status(201).json({
    success: true,
    message: "Profile Picture Updated Successsfully.",
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

export const addToPlaylist = catchAssyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.body.id);
  if (!course) return next(new ErrorHandler("Invalid Course Id!", 404));
  let isAvailable = false;
  user.playlist.map((item) => {
    if (item.course.toString() === course._id.toString()) {
      isAvailable = true;
      return isAvailable;
    }
  });
  if (isAvailable) {
    return next(new ErrorHandler("Item is already available!"), 409);
  }
  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });
  await user.save();
  res.status(200).json({
    success: true,
    message: "Added to playlist",
  });
});

export const removeFromPlaylist = catchAssyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.query.id);
  if (!course) return next(new ErrorHandler("Invalid Course Id!", 404));
  const newPlaylist = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) return item;
  });
  user.playlist = newPlaylist;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Removed from playlist",
  });
});

export const deleteMyProfile = catchAssyncError(async (req, res, next) => {
  const user = req.user;
  if (!user) return next(new ErrorHandler("User not found"), 404);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // Cancel subscription

  await User.deleteOne(user);

  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: `${user.name} your profile has deleted successfully.`,
    });
});

/* Admin Controllers */

// Get All Users
export const getAllUsers = catchAssyncError(async (req, res, next) => {
  const users = await User.find({});
  const numberOfUsers = users.length;
  res.status(200).json({
    success: true,
    numberOfUsers,
    users,
  });
});

// Update User Role From User To Admin or Admin To User
export const updateUserRole = catchAssyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User not found"), 404);

  if (user.role === "user") {
    user.role = "admin";
  } else {
    user.role = "user";
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: `${user.name}'s role has updated as ${user.role}.`,
  });
});

// Delete User Profile
export const deleteUserProfile = catchAssyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User not found"), 404);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // Cancel subscription

  await User.deleteOne(user);

  res.status(200).json({
    success: true,
    message: `${user.name} deleted successfully.`,
  });
});

User.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  const subscription = await User.find({ "subscription.status": "created" });

  stats[0].users = await User.countDocuments();
  stats[0].subscriptions = subscription.length;
  stats[0].createdAt = new Data(Date.now());

  await stats[0].save();
});
