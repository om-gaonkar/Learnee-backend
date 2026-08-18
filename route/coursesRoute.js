import express from "express";
import { getCoursesController } from "../controller/course/courseController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getCourseById } from "../controller/course/courseDetailController.js";

const router = express.Router();

router.get("/getcourses", authMiddleware, getCoursesController);
router.get("/getcourses/:id", authMiddleware, getCourseById);

export default router;
