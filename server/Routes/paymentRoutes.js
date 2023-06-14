import express from "express";
import {
  buySubscription,
  paymentVarification,
  gerRazorpayKey,
} from "../Controllers/paymentController.js";

import { authoriseAdmin, isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router();

// Buy Subscription
router.get("/subscribe", isAuthenticated, buySubscription);
router.post("/paymentvarification", isAuthenticated, paymentVarification);
router.get("/razorpaykey", gerRazorpayKey);

export default router;
