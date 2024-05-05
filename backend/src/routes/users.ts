import express from "express";
import multer from "multer";
import { z } from "zod";
import { validateRequest } from "../middlewares/validateRequest";
import * as usersController from "../controllers/users";
import { auth } from "../middlewares/auth";

const router = express.Router();
const upload = multer();

router.post(
	"/login",
	upload.none(),
	validateRequest({
		body: z.object({
			username: z.string().min(1).max(50),
			password: z.string().min(1).max(50),
			rememberMe: z.string().optional(),
		}),
	}),
	usersController.login
);
router.post("/logout", auth, usersController.logout);

export default router;
