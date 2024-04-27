import express from "express";
import usersRouter from "./users";
import materialsRouter from "./materials";
import schedulesRouter from "./schedules";
import subjectsRouter from "./subjects";
import * as MaterialsController from "../controllers/materials";

const router = express.Router();

router.get("/", MaterialsController.getAllMaterials);
router.use("/users", usersRouter);
router.use("/materials", materialsRouter);
router.use("/schedules", schedulesRouter);
router.use("/subjects", subjectsRouter);

export default router;
