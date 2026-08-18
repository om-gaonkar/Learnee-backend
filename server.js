import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRoutes.js";
import coursesRouter from "./route/coursesRoute.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// ==========================Middleware==================================
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lost-and-found-iota-six.vercel.app",
      "https://devtunnels.ms",
      "https://zkx589fb-5173.inc1.devtunnels.ms",
    ],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/courses", coursesRouter);

// ===============================Route==========================================
app.get("/", (req, res) => {
  res.send("MERN Backend Server is running smoothly!");
});

app.listen(PORT, () => {
  console.log(`Server is operating on port: ${PORT}`);
});
