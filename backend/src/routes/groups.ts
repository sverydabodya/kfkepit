import express from "express";
import * as GroupsController from "../controllers/groups";

const router = express.Router();

router.get("/", GroupsController.getAllGroups);

export default router;
