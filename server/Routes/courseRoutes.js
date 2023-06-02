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
  createCourse,
  getAllCourses,
} from "../Controllers/courseController.js";

const router = express.Router();

router.post("/createcourse", createCourse);
router.get("/courses", getAllCourses);

export default router;
