// // Add lecture, Delete Course, Get Course Details

// //  Delete lecture
// export default router;

import express from "express";
import {
  addLecture,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from "../Controllers/courseController.js";
import {
  authoriseAdmin,
  authoriseSubscriber,
  isAuthenticated,
} from "../Middlewares/auth.js";
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
router.get(
  "/course/:id",
  isAuthenticated,
  authoriseSubscriber,
  getCourseLectures
);

// Create A New Lecture In The Course
router.post(
  "/course/:id",
  isAuthenticated,
  authoriseAdmin,
  singleUpload,
  addLecture
);

// Delete A Course
router.delete("/course/:id", isAuthenticated, authoriseAdmin, deleteCourse);

// Delete A Lecture Of Course
router.delete("/lecture", isAuthenticated, authoriseAdmin, deleteLecture);

export default router;
