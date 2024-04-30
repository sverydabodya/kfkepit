import express from "express";
import * as SchedulesController from "../controllers/schedules";

const router = express.Router();

router.get("/", SchedulesController.getAllSchedules);
router.get("/:path", SchedulesController.getSchedule);

export default router;
