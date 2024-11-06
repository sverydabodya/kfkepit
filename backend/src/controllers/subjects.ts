import { RequestHandler } from "express";
import * as SubjectsService from "../services/subjects";
import createHttpError from "http-errors";

export const getAllSubjects: RequestHandler = async (req, res, next) => {
	try {
		const user = req.session.user;

		const subjects = await SubjectsService.getAllSubjects(user.groupId);

		if (subjects.length === 0) {
			throw createHttpError(404, "Subjects not found");
		}

		res.status(200).json(subjects);
	} catch (error) {
		next(error);
	}
};

export const createSubject: RequestHandler = async (req, res, next) => {
	const { name, teacherId, groups } = req.body;
	try {
		const subject = await SubjectsService.createSubject(
			name,
			teacherId,
			groups.split(",")
		);
		res.json(subject).status(200);
	} catch (error) {
		next(error);
	}
};

export const deleteSubject: RequestHandler = async (req, res, next) => {
	const id = req.params.id;
	try {
		const subject = await SubjectsService.deleteSubject(id);
		res.json(subject).status(200);
	} catch (error) {
		next(error);
	}
};
