import express from "express";
import * as CoursesController from "../controllers/courses";

const router = express.Router();

router.get("/", CoursesController.getAllCourses);

export default router;
