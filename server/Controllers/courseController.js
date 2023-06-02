// import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
// import { Course } from "../Models/Course.js";
// import ErrorMiddleware from "../Middlewares/Error.js";
// import ErrorHandler from "../Utils/errorHandler.js";
// const getAllCourses = catchAsyncError(async (req, res, next) => {
//   const courses = await Course.find().select("-lectures");
//   res.status(200).json({
//     success: true,
//     courses,
//   });
// });
// export { getAllCourses };

// export const createCourse = catchAsyncError(async (req, res, next) => {
//   const { title, description, category, createdBy } = req.body;
//   if (!title || !description || !category || !createdBy)
//     return next(new ErrorHandler("Please fill all fields", 400));
//   // const file = req.file;

//   await Course.create({
//     title,
//     description,
//     category,
//     createdBy,
//     poster: {
//       public_id: "temp",
//       url: "temp",
//     },
//   });

//   res.status(200).json({
//     success: true,
//     message: "Course created successfully, You can add lectures now.",
//   });
// });

import { catchAssyncError } from "../Middlewares/catchAsyncError.js";
import { Course } from "../Models/Course.js";

export const createCourse = catchAssyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    res.json({
      success: false,
      error: "Please enter all fields.",
    });
  }
  await Course.create({
    title,
    description,
    category,
    createdBy,
    lectures: {
      title: "temp",
      description: "This is an temp description for creation of the course.",
      video: {
        public_id: "temp",
        url: "temp",
      },
    },
    poster: {
      public_id: "temp",
      url: "temp",
    },
  });

  res.status(200).json({
    success: true,
    message: "Course created successfully.",
  });
});

export const getAllCourses = catchAssyncError(async (req, res, next) => {
  const courses = await Course.find({}).select("-lectures");
  if (!courses)
    return res.status(200).json({
      success: true,
      message: "No Courses Yet!",
    });
  res.status(200).json({
    success: true,
    courses,
  });
});
