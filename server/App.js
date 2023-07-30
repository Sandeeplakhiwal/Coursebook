import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./Middlewares/Error.js";
import cookieParser from "cookie-parser";
import Cors from "cors";

// Importing Routes
import course from "./Routes/courseRoutes.js";
import user from "./Routes/userRoutes.js";
import payment from "./Routes/paymentRoutes.js";
import other from "./Routes/otherRoutes.js";

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
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://coursebook-sigma.vercel.app"
  );
  next();
});
app.use(
  Cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Using Routes
app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

app.get("/", (req, res) => {
  res.send(
    "<h1>Coursebook official server, click <a href='https://coursebook-sigma.vercel.app'>here</a> to visit.</h1>"
  );
});

export default app;

app.use(ErrorMiddleware);
