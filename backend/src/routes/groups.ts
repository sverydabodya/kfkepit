import express from "express";
import * as GroupsController from "../controllers/groups";
import multer from "multer";
import { validateRequest } from "../middlewares/validateRequest";
import { z } from "zod";

const router = express.Router();
const upload = multer();

router.get("/", GroupsController.getAllGroups);

router.post(
	"/",
	upload.none(),
	validateRequest({
		body: z.object({
			name: z.string(),
			courseId: z.string(),
			subjects: z.string(),
		}),
	}),
	GroupsController.createGroup
);

router.delete("/:id", GroupsController.deleteGroup);

export default router;
