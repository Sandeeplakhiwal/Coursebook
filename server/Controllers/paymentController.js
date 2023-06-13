import { catchAssyncError } from "../Middlewares/catchAsyncError.js";
import { User } from "../Models/User.js";
import ErrorHandler from "../Utils/errorHandler.js";
import Razorpay from "razorpay";

export const buySubscription = catchAssyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role === "admin")
    return next(new ErrorHandler("Admin can't buy subscription", 404));

  const plan_id = process.env.PLAN_ID || plan_M13U5mvU5Tvyz1;
  let instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY_ID,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });
  const subscription = await instance.subscriptions.create({
    plan_id,
    customer_notify: 1,
    quantity: 5,
    total_count: 12,
  });

  user.subscription.id = subscription.id;
  user.subscription.status = subscription.status;
  await user.save();

  res.status(201).json({
    success: true,
    subscription,
  });
});
