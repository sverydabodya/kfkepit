import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { Role } from "@prisma/client";

export const isAdmin: RequestHandler = (req, res, next) => {
	if (req.session.user.role === Role.admin) {
		next();
	} else {
		next(createHttpError(403, "Forbidden"));
	}
};
