import express from "express";
import multer from "multer";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";
import { z } from "zod";
import * as MaterialsController from "../controllers/materials";
import { isTeacher } from "../middlewares/isTeacher";
import { multerConfig } from "../config/config";

const router = express.Router();
const upload = multer(multerConfig);

router.get(
	"/subject/:subject",
	validateRequestParams(z.object({ subject: z.string() })),
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
	validateRequestBody(
		z.object({
			materialName: z.string(),
			group: z.string(),
			subject: z.string(),
		})
	),
	MaterialsController.newMaterial
);

router.delete(
	"/delete/:id",
	isTeacher,
	validateRequestParams(z.object({ id: z.string() })),
	MaterialsController.deleteMaterial
);

export default router;
