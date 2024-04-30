import express from "express";
import multer from "multer";
import * as MaterialsController from "../controllers/materials";
import { isTeacher } from "../middlewares/isTeacher";
import { multerConfig } from "../config/config";

const router = express.Router();
const upload = multer(multerConfig);

router.get("/subject/:subject", MaterialsController.getMaterialsBySubject);
router.get("/group", MaterialsController.getMaterialsByGroup);
router.get("/more", MaterialsController.getMoreMaterials);

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
	MaterialsController.newMaterial
);

export default router;
