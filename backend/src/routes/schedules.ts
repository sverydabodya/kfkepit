import express from "express";
import multer from "multer";
import { z } from "zod";
import * as SchedulesController from "../controllers/schedules";
import { schedulesMulterConfig } from "../config/config";
import { isAdmin } from "../middlewares/isAdmin";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();
const upload = multer(schedulesMulterConfig);

router.get("/", SchedulesController.getAllSchedules);
router.get("/:path", SchedulesController.getSchedule);

router.post(
	"/",
	isAdmin,
	upload.single("schedule"),
	validateRequest({ body: z.object({ name: z.string() }) }),
	SchedulesController.createSchedule
);

router.delete("/:id", isAdmin, SchedulesController.deleteSchedule);

export default router;
