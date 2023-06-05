// import express from "express";
// import dotenv, { config } from "dotenv";
// import ErrorMiddleware from "./Middlewares/Error.js";
// import cookieParser from "cookie-parser";

// config({
//   path: "./Config/Config.env",
// });

// const app = express();

// // USING MIDDLEWARES
// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );
// app.use(cookieParser());

// // Importing Routes
// import course from "./Routes/courseRoutes.js";
// import user from "./Routes/userRoutes.js";

// // Using Routes
// app.use("/api/v1", course);
// app.use("/api/v1", user);

// export default app;

// app.use(ErrorMiddleware);

import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./Middlewares/Error.js";
import cookieParser from "cookie-parser";

// Importing Routes
import course from "./Routes/courseRoutes.js";
import user from "./Routes/userRoutes.js";

const app = express();

config({
  path: "./Config/Config.env",
});

// Using Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

// Using Routes
app.use("/api/v1", course);
app.use("/api/v1", user);

app.get("/", (req, res) => {
  res.send("Coursebook official server.");
});

export default app;

app.use(ErrorMiddleware);
