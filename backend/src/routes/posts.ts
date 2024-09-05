import express from "express";
import multer from "multer";
import { z } from "zod";
import * as PostsController from "../controllers/posts";
import { validateRequest } from "../middlewares/validateRequest";
import { isAdmin } from "../middlewares/isAdmin";
import { postsMulterConfig } from "../config/config";

const router = express.Router();
const upload = multer(postsMulterConfig);

router.get("/", PostsController.getPosts);
router.get(
	"/:slug",
	validateRequest({ params: z.object({ slug: z.string() }) }),
	PostsController.getPost
);

router.post(
	"/",
	isAdmin,
	upload.single("cover"),
	validateRequest({
		body: z.object({ title: z.string(), content: z.string() }),
	}),
	PostsController.createPost
);

router.delete(
	"/:id",
	isAdmin,
	validateRequest({ params: z.object({ id: z.string() }) }),
	PostsController.deletePost
);

export default router;
