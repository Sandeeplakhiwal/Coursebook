import { catchAssyncError } from "../Middlewares/catchAsyncError.js";
import { sendEmail } from "../Utils/sendEmail.js";

export const contact = catchAssyncError(async (req, res, next) => {
  const { name, email, message } = req.body;
  const to = process.env.MY_MAIL;
  const subject = "Contact from Coursebook";
  const text = `I am ${name} and my Email is ${email}.\n ${message}`;
  await sendEmail(to, subject, text);
  res.status(200).json({
    success: true,
    message: "Your message has been send.",
  });
});

export const courseRequest = catchAssyncError(async (req, res, next) => {
  const { name, email, course } = req.body;
  const to = process.env.MY_MAIL;
  const subject = "Course Request from Coursebook";
  const text = `I am ${name} and my Email is ${email}.\n ${course}`;
  await sendEmail(to, subject, text);
  res.status(200).json({
    success: true,
    message: "Your request has been send.",
  });
});

export const getDashboardStats = catchAssyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});
