import { RequestHandler } from "express";
import * as SubjectsService from "../services/subjects";

export const getAllSubjects: RequestHandler = async (req, res, next) => {
	try {
		const user = req.session.user;

		const subjects = await SubjectsService.getAllSubjects(user);

		res.status(200).json(subjects);
	} catch (error) {
		next(error);
	}
};
