import { catchAssyncError } from "../Middlewares/catchAsyncError.js";
import { Course } from "../Models/Course.js";
import getDataUri from "../Utils/dataURI.js";
import cloudinary from "cloudinary";

export const createCourse = catchAssyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    res.json({
      success: false,
      error: "Please enter all fields.",
    });
  }
  const file = req.file;
  // console.log(file);
  const fileUri = getDataUri(file);
  // console.log(fileUri);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
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
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
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

export const getCourseLectures = catchAssyncError(async (req, res, next) => {
  // const user = await User.findById(req.user._id);
  const course = await Course.findById(req.params.id);
  if (!course) return next(new ErrorHandler("Course not found!", 404));
  course.views += 1;
  await course.save();
  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});
export const addLecture = catchAssyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // const file = req.file; (using multer)

  const course = await Course.findById(id);
  if (!course) return next(new ErrorHandler("Course not found!", 404));
  // upload lecture on cloundiary
  course.lectures.push({
    title,
    description,
    video: {
      public_id: "url",
      url: "url",
    },
  });

  course.numOfVideos = course.lectures.length;
  await course.save();
  res.status(200).json({
    success: true,
    message: "Lecture added in Course",
  });
});
