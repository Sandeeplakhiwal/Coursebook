// // Add lecture, Delete Course, Get Course Details

// //  Delete lecture
// export default router;

import express from "express";
import {
  addLecture,
  createCourse,
  getAllCourses,
  getCourseLectures,
} from "../Controllers/courseController.js";
import { authoriseAdmin, isAuthenticated } from "../Middlewares/auth.js";
import singleUpload from "../Middlewares/multer.js";

const router = express.Router();

// Create new course only admin
router.post(
  "/createcourse",
  isAuthenticated,
  authoriseAdmin,
  singleUpload,
  createCourse
);

// Get All Available Courses
router.get("/courses", getAllCourses);

// Get All Lectures Of The Course
router
  .get("/course/:id", isAuthenticated, getCourseLectures)
  .post(isAuthenticated, authoriseAdmin, singleUpload, addLecture);

export default router;
