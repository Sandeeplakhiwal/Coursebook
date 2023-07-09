import { catchAssyncError } from "../Middlewares/catchAsyncError.js";
import { User } from "../Models/User.js";
import ErrorHandler from "../Utils/errorHandler.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { Payment } from "../Models/Payment.js";

export const buySubscription = catchAssyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role === "admin")
    return next(new ErrorHandler("Admin can't buy subscription", 404));

  const plan_id = process.env.PLAN_ID || plan_M13U5mvU5Tvyz1;
  let instance = new Razorpay({
    key_id: "rzp_test_yEE4dn9CBr9UI8",
    key_secret: "jZPUoDxYoa9lTAN4x9STwZtp",
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

export const paymentVarification = catchAssyncError(async (req, res, next) => {
  const { razorpay_signature, razorpay_payment_id, razorpay_subscription_id } =
    req.body;
  const user = await User.findById(req.user._id);
  const subscriptionId = user.subscription.id;
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(razorpay_payment_id + "|" + subscriptionId, "utf-8")
    .digest("hex");
  const isAuthentic = generated_signature === razorpay_signature;

  if (!isAuthentic) {
    return res.redirect(`${process.env.FRONTEND_URL}/paymentfailed`);
  }
  await Payment.create({
    razorpay_signature,
    razorpay_payment_id,
    razorpay_subscription_id,
  });
  user.subscription.status = "active";
  res.redirect(
    `${process.env.FRONTEND_URL}/paymentsuccess?referance=${razorpay_payment_id}`
  );
});

export const gerRazorpayKey = catchAssyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: "rzp_test_yEE4dn9CBr9UI8",
  });
});

export const cancelSubscription = catchAssyncError(async (req, res, next) => {
  let instance = new Razorpay({
    key_id: "rzp_test_yEE4dn9CBr9UI8",
    key_secret: "jZPUoDxYoa9lTAN4x9STwZtp",
  });
  const user = await User.findById(req.user._id);
  const subscriptionId = user.subscription.id;
  let refund = false;
  await instance.subscriptions.cancel(subscriptionId);
  const payment = await Payment.findOne({
    razorpay_subscription_id: subscriptionId,
  });
  // const gap = Date.now() - payment.createdAt;
  // const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

  // if (refundTime > gap) {
  //   // await instance.payments.refund(payment.razorpay_payment_id);
  //   refund = true;
  // }

  await payment.remove();
  user.subscription.id = undefined;
  user.subscription.status = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: refund
      ? "Subscription cancelled, You will receive full refund within 7 working days."
      : "Subscription cancelled, Now refund initiated as subscription was cancelled after 7 days.",
  });
});
