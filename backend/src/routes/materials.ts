import express from "express";
import multer from "multer";
import { z } from "zod";
import * as MaterialsController from "../controllers/materials";
import { isTeacher } from "../middlewares/isTeacher";
import { multerConfig } from "../config/config";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();
const upload = multer(multerConfig);

router.get(
	"/subject/:subject",
	validateRequest({ params: z.object({ subject: z.string() }) }),
	MaterialsController.getMaterialsBySubject
);
router.get(
	"/group/:group",
	validateRequest({
		params: z.object({ group: z.string() }),
		query: z.object({ subject: z.string() }),
	}),
	MaterialsController.getMaterialsByGroup
);
router.get(
	"/more/:page",
	validateRequest({
		params: z.object({ page: z.string() }),
		query: z.object({ subject: z.string() }),
	}),
	MaterialsController.getMoreMaterials
);

router.post(
	"/new",
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
			group: z.string(),
			subject: z.string(),
		}),
	}),
	MaterialsController.newMaterial
);

router.delete(
	"/delete/:id",
	isTeacher,
	validateRequest({ params: z.object({ id: z.string() }) }),
	MaterialsController.deleteMaterial
);

export default router;
