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

config({
  path: "./Config/Config.env",
});

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Coursebook Official Server</h1>");
});

// Using Middlewares
app.use(express.json());

// Importing Routes
import course from "./Routes/courseRoutes.js";

// Using Routes
app.use("/api/v1", course);

export default app;

app.use(ErrorMiddleware);
