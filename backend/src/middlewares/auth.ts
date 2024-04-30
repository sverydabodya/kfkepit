import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const auth: RequestHandler = (req, res, next) => {
	if (!req.session.user) {
		throw createHttpError(401, "Unauthorized");
	} else {
		next();
	}
};
