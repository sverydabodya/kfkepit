import { RequestHandler } from "express";
import * as SubjectsService from "../services/subjects";
import createHttpError from "http-errors";

export const getAllSubjects: RequestHandler = async (req, res, next) => {
	try {
		const user = req.session.user;

		const subjects = await SubjectsService.getAllSubjects(user);

		if (subjects.length === 0) {
			throw createHttpError(404, "Subjects not found");
		}

		res.status(200).json(subjects);
	} catch (error) {
		next(error);
	}
};
