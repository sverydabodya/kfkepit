import express from "express";
import multer from "multer";
import { z } from "zod";
import * as MaterialsController from "../controllers/materials";
import { isTeacher } from "../middlewares/isTeacher";
import { materialsMulterConfig } from "../config/config";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();
const upload = multer(materialsMulterConfig);

router.get(
	"/subject/:subject",
	validateRequest({
		params: z.object({ subject: z.string() }),
		query: z.object({ page: z.string().optional() }),
	}),
	MaterialsController.getMaterialsBySubject
);
router.get(
	"/group/:groups",
	validateRequest({
		params: z.object({ groups: z.string() }),
		query: z.object({ subject: z.string(), page: z.string().optional() }),
	}),
	MaterialsController.getMaterialsByGroup
);

router.post(
	"/",
	isTeacher,
	upload.fields([
		{ name: "file1", maxCount: 1 },
		{ name: "file2", maxCount: 1 },
		{ name: "file3", maxCount: 1 },
		{ name: "file4", maxCount: 1 },
		{ name: "file5", maxCount: 1 },
	]),
	validateRequest({
		body: z.object({
			materialName: z.string(),
			groups: z.string(),
			subject: z.string(),
		}),
	}),
	MaterialsController.newMaterial
);

router.delete(
	"/:id",
	isTeacher,
	validateRequest({ params: z.object({ id: z.string() }) }),
	MaterialsController.deleteMaterial
);

export default router;
