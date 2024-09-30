import express from "express";
import authRouter from "./auth";
import materialsRouter from "./materials";
import schedulesRouter from "./schedules";
import subjectsRouter from "./subjects";
import postsRouter from "./posts";
import groupsRouter from "./groups";
import coursesRouter from "./courses";
import usersRouter from "./users";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/posts", postsRouter);
router.use(auth);
router.use("/materials", materialsRouter);
router.use("/schedules", schedulesRouter);
router.use("/subjects", subjectsRouter);
router.use("/groups", groupsRouter);
router.use("/courses", coursesRouter);
router.use("/users", usersRouter);

router.all("*", (req, res) => {
	res.status(404).json({ error: "Route does not exist" });
});

export default router;
