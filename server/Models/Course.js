// import mongoose from "mongoose";

// const schema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, "Please enter course title"],
//     minLength: [4, "Title must be at least 4 characters"],
//     maxLength: [80, "Title can't exceed 80 characters"],
//   },
//   description: {
//     type: String,
//     required: [true, "Please enter course description"],
//     minLength: [20, "Title must be at least 20 characters"],
//   },

//   lectures: [
//     {
//       title: {
//         type: String,
//         required: true,
//       },
//       description: {
//         type: String,
//         required: true,
//       },
//       video: {
//         public_id: {
//           type: String,
//           required: true,
//         },
//         url: {
//           type: String,
//           required: true,
//         },
//       },
//     },
//   ],
//   poster: {
//     public_id: {
//       type: String,
//       required: true,
//     },
//     url: {
//       type: String,
//       required: true,
//     },
//   },
//   views: {
//     type: Number,
//     default: 0,
//   },
//   numOfVideos: {
//     type: Number,
//     default: 0,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   createdBy: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export const Course = mongoose.model("Course", schema);

import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [4, "Title must be atleast 4 characters"],
    maxlength: [80, "Title cannot exceed 80 characters"],
  },
  description: {
    type: String,
    required: true,
    minlength: [20, "Description must be atleast 20 characters"],
    maxlength: [1000, "Description cannot exceed 1000 characters"],
  },
  lectures: [
    {
      title: {
        type: String,
        required: [true, "Please enter course title"],
        minlength: [4, "Title must be atleast 4 characters"],
        maxlength: [80, "Title cannot exceed 80 characters"],
      },
      description: {
        type: String,
        required: [true, "Please enter course description"],
        minlength: [20, "Description must be atleast 20 characters"],
        maxlength: [500, "Description cannot exceed 500 characters"],
      },
      video: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  numOfVideos: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Course = mongoose.model("Course", schema);
