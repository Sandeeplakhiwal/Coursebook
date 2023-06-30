import { catchAssyncError } from "../Middlewares/catchAsyncError.js";
import { sendEmail } from "../Utils/sendEmail.js";
import { Stats } from "../Models/Stats.js";

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
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.push(stats[i]);
  }

  const requiredSize = 12 - stats.length;

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscriptions: 0,
      views: 0,
    });
  }

  const usersCount = statsData[11].users;
  const subscriptionCount = statsData[11].subscriptions;
  const viewsCount = statsData[11].views;

  let usersProfit = true,
    viewsProfit = true,
    subscriptionProfit = true;

  let usersPercentage = 0,
    viewsPercentage = 0,
    subscriptionPercentage = 0;

  if (statsData[10].users === 0) {
    usersPercentage = usersCount * 100;
  } else {
    usersPercentage =
      ((usersCount - statsData[10].users) / statsData[10].users) * 100;
  }
  if (statsData[10].subscriptions === 0) {
    subscriptionPercentage = subscriptionCount * 100;
  } else {
    subscriptionPercentage =
      ((subscriptionCount - statsData[10].subscriptions) /
        statsData[10].subscriptions) *
      100;
  }
  if (statsData[10].views === 0) {
    viewsPercentage = viewsCount * 100;
  } else {
    viewsPercentage =
      ((viewsCount - statsData[10].views) / statsData[10].views) * 100;
  }

  if (usersPercentage < 0) usersProfit = false;
  if (subscriptionPercentage < 0) subscriptionProfit = false;
  if (viewsPercentage < 0) subscriptionProfit = false;

  res.status(200).json({
    success: true,
    stats: statsData,
    usersCount,
    subscriptionCount,
    viewsCount,
    usersPercentage,
    subscriptionPercentage,
    viewsPercentage,
    usersProfit,
    subscriptionProfit,
    viewsProfit,
  });
});
