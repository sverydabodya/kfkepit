import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Role from "../models/role";

export const isTeacher: RequestHandler = (req, res, next) => {
	if (req.session.user.role === Role.Teacher) {
		next();
	} else {
		res.status(401).redirect("/");
		// throw createHttpError(401, "Unauthorized");
	}
};
