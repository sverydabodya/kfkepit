import express from "express";
import usersRouter from "./users";
import materialsRouter from "./materials";
import schedulesRouter from "./schedules";
import subjectsRouter from "./subjects";
import postsRouter from "./posts";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use(auth);
router.use("/materials", materialsRouter);
router.use("/schedules", schedulesRouter);
router.use("/subjects", subjectsRouter);

router.all("*", (req, res) => {
	res.status(404).json({ error: "Route does not exist" });
});

export default router;
