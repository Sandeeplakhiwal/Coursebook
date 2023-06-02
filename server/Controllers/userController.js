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
