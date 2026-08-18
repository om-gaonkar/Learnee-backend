import express from "express";
import { getCoursesController } from "../controller/course/courseController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getcourses", authMiddleware, getCoursesController);

export default router;
