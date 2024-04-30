import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { Role } from "@prisma/client";

export const isTeacher: RequestHandler = (req, res, next) => {
	if (req.session.user.role === Role.teacher) {
		next();
	} else {
		throw createHttpError(403, "Forbidden");
	}
};
