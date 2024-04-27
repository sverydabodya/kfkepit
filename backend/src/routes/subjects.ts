import express from "express";
import * as SubjectsController from "../controllers/subjects";

const router = express.Router();

router.get("/", SubjectsController.getAllSubjects);

export default router;
