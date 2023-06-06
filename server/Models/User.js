// import mongoose from "mongoose";
// import validator from "validator";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const schema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter your name"],
//   },
//   // Email: type, required, unique, validate
//   email: {
//     type: String,
//     required: [true, "Please enter your email"],
//     unique: true,
//     validate: validator.isEmail,
//   },
//   // Password: type, required, minLength, select
//   password: {
//     type: String,
//     required: [true, "Please enter your password"],
//     minLength: [6, "Password must be atleast 6 characters"],
//     select: false,
//   },
//   role: {
//     type: String,
//     enum: ["admin", "user"],
//     default: "user",
//   },
//   // Subscription: id, status
//   subscription: {
//     id: String,
//     status: String,
//   },
//   // Avatar: public_id_url
//   avatar: {
//     public_id: {
//       type: String,
//       required: true,
//     },
//     url: {
//       type: String,
//       required: true,
//     },
//   },
//   // Playlist: [courseid, poster]
//   playlist: [
//     {
//       course: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Course",
//       },
//       poster: String,
//     },
//   ],
//   // CreatedAt: type, default
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   ResetPasswordToken: String,
//   ResetPasswordExpire: String,
// });

// schema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// schema.methods.generateJWTToken = function () {
//   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: "15d",
//   });
// };

// schema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// export const User = mongoose.model("User", schema);

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your good name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "Email already exists!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be atleast 6 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  subscription: {
    id: String,
    status: String,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  playlist: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      poster: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ResetPasswordToken: String,
  ResetPasswordExpire: String,
});

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

schema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", schema);
