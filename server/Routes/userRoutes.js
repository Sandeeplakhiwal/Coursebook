// import express from "express";
// import {
//   getMyProfile,
//   login,
//   logout,
//   register,
// } from "../Controllers/userController.js";
// import { isAuthenticated } from "../Middlewares/auth.js";

// const router = express.Router();

// // To register a new user
// router.post("/register", register);

// // Login
// router.post("/login", login);

// // Logout
// router.get("/logout", logout);

// // Get my profile
// router.get("/me", getMyProfile);

// // Change Password
// // Update Profile
// // Update Profile Picture

// // Forget Password
// // Reset Password

// // Add to playlist
// // Remove from playlist

// export default router;

import express from "express";
import {
  getMyProfile,
  login,
  logout,
  register,
} from "../Controllers/userController.js";
import { isAuthenticated } from "../Middlewares/auth.js";

const router = express.Router();

/* REGISTER A NEW USER */
router.post("/register", register);

/* LOGIN */
router.post("/login", login);

/* LOGOUT */
router.get("/logout", isAuthenticated, logout);

/* GET MY PROFILE */
router.get("/me", isAuthenticated, getMyProfile);

export default router;
