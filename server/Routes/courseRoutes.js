// import express from "express";
// import {
//   createCourse,
//   getAllCourses,
// } from "../Controllers/courseController.js";

// const router = express.Router();

// // Get all courses without lectures
// router.get("/courses", getAllCourses);

// // Create new course only admin
// router.post("/createcourse", createCourse);

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
import singleUpload from "../Middlewares/multer.js";

const router = express.Router();

// Create new course only admin
router.post("/createcourse", singleUpload, createCourse);

// Get All Available Courses
router.get("/courses", getAllCourses);

// Get All Lectures Of The Course
router.get("/course/:id", getCourseLectures).post(singleUpload, addLecture);

export default router;
