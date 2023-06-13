import express from "express";
import { buySubscription } from "../Controllers/paymentController.js";

import { authoriseAdmin, isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router();

// Buy Subscription
router.get("/subscribe", isAuthenticated, buySubscription);
// router.post("/paymentvarification", isAuthenticated, paymentVarification);

export default router;
