import app from "./App.js";
import { connectDB } from "./Config/Database.js";
import cloundiary from "cloudinary";
import Razorpay from "razorpay";
import nodeCron from "node-cron";
import { Stats } from "./Models/Stats.js";

connectDB();

cloundiary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export let instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY_ID,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

nodeCron.schedule("0 0 1 * *", async () => {
  try {
    await Stats.create({});
  } catch (error) {
    console.log(error);
  }
});

// let temp = async () => {
//   try {
//     await Stats.create({});
//   } catch (error) {
//     console.log(error);
//   }
// };

// temp();

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on PORT: ${process.env.PORT}`);
});
