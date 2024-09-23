import express from "express";
import multer from "multer";
import { z } from "zod";
import { validateRequest } from "../middlewares/validateRequest";
import * as authController from "../controllers/auth";
import { auth } from "../middlewares/auth";

const router = express.Router();
const upload = multer();

router.get("/", authController.getAuthenticatedUser);

router.post(
	"/login",
	upload.none(),
	validateRequest({
		body: z.object({
			username: z.string().min(1).max(50),
			password: z.string().min(1).max(50),
			rememberMe: z.boolean().optional(),
		}),
	}),
	authController.login
);
router.post("/logout", auth, authController.logout);

export default router;
