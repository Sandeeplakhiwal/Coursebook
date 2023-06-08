// // Forget Password
// // Reset Password

// // Add to playlist
// // Remove from playlist

// export default router;

import express from "express";
import {
  addToPlaylist,
  changePassword,
  forgotPassword,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePic,
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

/* CHANGE PASSWORD */
router.put("/changepassword", isAuthenticated, changePassword);

/* UPDATE PROFILE */
router.put("/updateprofile", isAuthenticated, updateProfile);

/* UPDATE PROFILE PIC */
router.put("/updateprofilepic", isAuthenticated, updateProfilePic);

/* FORGOT PASSWORD */
router.post("/forgetpassword", forgotPassword);

/* RESET PASSWORD */
router.put("/resetpassword/:token", resetPassword);

/* ADD TO PLAYLIST */
router.post("/addtoplaylist", isAuthenticated, addToPlaylist);

/* REMOVE FROM PLAYLIST */
router.delete("/removefromplaylist", isAuthenticated, removeFromPlaylist);

export default router;
