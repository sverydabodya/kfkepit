import express from "express";
import * as SubjectsController from "../controllers/subjects";
import { validateRequest } from "../middlewares/validateRequest";
import { z } from "zod";

const router = express.Router();

router.get("/", SubjectsController.getAllSubjects);

router.post(
	"/",
	validateRequest({
		body: z.object({
			name: z.string(),
			teacherId: z.string(),
			groups: z.string(),
		}),
	}),
	SubjectsController.createSubject
);

router.delete("/:id", SubjectsController.deleteSubject);

export default router;
