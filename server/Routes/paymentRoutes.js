import express from "express";
import {
  buySubscription,
  paymentVarification,
  gerRazorpayKey,
  cancelSubscription,
} from "../Controllers/paymentController.js";

import { authoriseAdmin, isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router();

// Buy Subscription
router.get("/subscribe", isAuthenticated, buySubscription);
router.post("/paymentvarification", isAuthenticated, paymentVarification);
router.get("/razorpaykey", gerRazorpayKey);
router.delete("/subscribe/cancel", isAuthenticated, cancelSubscription);

export default router;
