import express from "express";
import * as CoursesController from "../controllers/courses";
import { validateRequest } from "../middlewares/validateRequest";
import { z } from "zod";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.get("/", CoursesController.getAllCourses);

router.post(
	"/",
	upload.none(),
	validateRequest({
		body: z.object({ name: z.string(), groups: z.string().optional() }),
	}),
	CoursesController.createCourse
);

router.delete("/:id", CoursesController.deleteCourse);

export default router;
