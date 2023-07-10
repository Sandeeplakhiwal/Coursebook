// // Forget Password
// // Reset Password

// // Add to playlist
// // Remove from playlist

// export default router;

import express from "express";
import {
  addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUserProfile,
  forgotPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePic,
  updateUserRole,
  RestP,
} from "../Controllers/userController.js";
import { authoriseAdmin, isAuthenticated } from "../Middlewares/auth.js";
import singleUpload from "../Middlewares/multer.js";

const router = express.Router();

/* REGISTER A NEW USER */
router.post("/register", singleUpload, register);

/* LOGIN */
router.post("/login", login);

/* LOGOUT */
router.get("/logout", isAuthenticated, logout);
router.get("/resp", RestP);

/* GET MY PROFILE */
router.get("/me", isAuthenticated, getMyProfile);

/* CHANGE PASSWORD */
router.put("/changepassword", isAuthenticated, changePassword);

/* UPDATE PROFILE */
router.put("/updateprofile", isAuthenticated, updateProfile);

/* UPDATE PROFILE PIC */
router.put(
  "/updateprofilepic",
  isAuthenticated,
  singleUpload,
  updateProfilePic
);

/* FORGOT PASSWORD */
router.post("/forgetpassword", forgotPassword);

/* RESET PASSWORD */
router.put("/resetpassword/:token", resetPassword);

/* ADD TO PLAYLIST */
router.post("/addtoplaylist", isAuthenticated, addToPlaylist);

/* REMOVE FROM PLAYLIST */
router.delete("/removefromplaylist", isAuthenticated, removeFromPlaylist);

/* DELETE MY PROFILE */
router.delete("/deletemyprofile", isAuthenticated, deleteMyProfile);

/* *** ADMIN ROUTES *** */

/* GET ALL USERS */
router.get("/admin/users", isAuthenticated, authoriseAdmin, getAllUsers);

/* UPDATE USER ROLE */
router.put(
  "/admin/updaterole/:id",
  isAuthenticated,
  authoriseAdmin,
  updateUserRole
);

/* UPDATE USER PROFILE */
router.delete(
  "/admin/deleteuser/:id",
  isAuthenticated,
  authoriseAdmin,
  deleteUserProfile
);

export default router;
