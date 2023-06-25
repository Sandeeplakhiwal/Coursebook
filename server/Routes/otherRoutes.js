import express from "express";
import { contact, courseRequest } from "../Controllers/otherController.js";
import { isAuthenticated, authoriseAdmin } from "../Middlewares/auth.js";

const router = express.Router();

// Contact form
router.post("/contact", contact);

// Request for a new course form
router.post("/courserequest", courseRequest);

// Get Admin Dashboard Stats
router.get("/admin/stats", isAuthenticated, authoriseAdmin);

export default router;
