import { catchAssyncError } from "../Middlewares/catchAsyncError.js";
import { Course } from "../Models/Course.js";
import getDataUri from "../Utils/dataURI.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../Utils/errorHandler.js";
import { Stats } from "../Models/Stats.js";

export const createCourse = catchAssyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy)
    return next(new ErrorHandler("Please fill all the fields!", 400));
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

  res.status(201).json({
    success: true,
    message: "Course created successfully.",
  });
});

export const getAllCourses = catchAssyncError(async (req, res, next) => {
  const courses = await Course.find({}).select("-lectures");
  if (!courses) return next(new ErrorHandler("No Courses Yet!"), 404);
  res.status(200).json({
    success: true,
    courses,
  });
});

export const getCourseLectures = catchAssyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) return next(new ErrorHandler("Course not found!", 404));
  course.views += 1;
  await course.save();
  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

// Max Video Size: 100mb
export const addLecture = catchAssyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const file = req.file;
  const fileUri = getDataUri(file);

  if (!title || !description || !file || !id)
    return next(new ErrorHandler("Please fill all fields!", 400));

  const course = await Course.findById(id);
  if (!course) return next(new ErrorHandler("Course not found!", 404));

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
  });
  course.lectures.push({
    title,
    description,
    video: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  course.numOfVideos = course.lectures.length;
  await course.save();
  res.status(201).json({
    success: true,
    message: "Lecture added in Course",
  });
});

export const deleteCourse = catchAssyncError(async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new ErrorHandler("Can't get course id!", 400));

  const course = await Course.findById(id);
  if (!course) return next(new ErrorHandler("Course not found", 404));

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];
    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id);
  }

  await Course.deleteOne(course);

  res.status(200).json({
    success: true,
    message: "Course deleted successfully.",
  });
});

export const deleteLecture = catchAssyncError(async (req, res, next) => {
  const { courseId, lectureId } = req.query;

  if (!courseId || !lectureId)
    return next(new ErrorHandler("Can't get course id or lecture id!", 400));

  const course = await Course.findById(courseId);
  if (!course) return next(new ErrorHandler("Course not found", 404));

  const lecture = course.lectures.find((item) => {
    if (item._id.toString() === lectureId.toString()) return item;
  });

  await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
    resource_type: "video",
  });

  course.lectures = course.lectures.filter((item) => {
    if (item._id.toString() !== lectureId.toString()) return item;
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture deleted successfully.",
  });
});

Course.watch().on("change", async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);

  const courses = await Course.find({});

  let totalViews = 0;

  for (let i = 0; i < courses.length; i++) {
    totalViews += courses[i].views;
  }

  stats[0].views = totalViews;
  stats[0].createdAt = new Data(Date.now());

  await stats[0].save();
});
