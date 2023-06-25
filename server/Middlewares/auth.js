import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";
import ErrorHandler from "../Utils/errorHandler.js";
import { catchAssyncError } from "./catchAsyncError.js";

export const isAuthenticated = catchAssyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler("Not Logged In!", 401));
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
});

export const authoriseAdmin = (req, res, next) => {
  if (req.user.role === "user")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resourse`,
        403
      )
    );
  next();
};
export const authoriseSubscriber = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.subscription.status !== "active")
    return next(
      new ErrorHandler(`Only subscribers can access this resourse.`, 403)
    );
  next();
};
