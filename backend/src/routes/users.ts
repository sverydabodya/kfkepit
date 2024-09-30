import express from "express";
import * as UsersController from "../controllers/users";
import { validateRequest } from "../middlewares/validateRequest";
import { z } from "zod";
import { Role } from "@prisma/client";
import multer from "multer";

const router = express.Router();
const role = z.nativeEnum(Role);
const upload = multer();

router.get(
	"/",
	validateRequest({
		query: z.object({
			page: z.string().optional(),
			role: role.optional(),
			groupId: z.string().optional(),
			courseId: z.string().optional(),
			name: z.string().optional(),
			subjects: z.string().optional(),
		}),
	}),
	UsersController.getAllUsers
);
router.get("/roles", UsersController.getRoles);

router.post(
	"/",
	upload.none(),
	validateRequest({
		body: z.object({
			name: z.string(),
			role: role,
			groupdId: z.string().optional(),
			courseId: z.string().optional(),
			subjects: z.string().optional(),
		}),
	}),
	UsersController.createUser
);

router.patch(
	"/:id",
	upload.none(),
	validateRequest({
		params: z.object({ id: z.string() }),
		body: z.object({
			name: z.string().optional(),
			role: role.optional(),
			groupdId: z.string().optional(),
			courseId: z.string().optional(),
			subjects: z.string().optional(),
		}),
	}),
	UsersController.updateUser
);

router.delete(
	"/:id",
	validateRequest({ params: z.object({ id: z.string() }) }),
	UsersController.deleteUser
);

export default router;
