import { RequestHandler } from "express";
import * as CoursesService from "../services/courses";

export const getAllCourses: RequestHandler = async (req, res, next) => {
	try {
		const courses = await CoursesService.getAllCourses();
		res.status(200).json(courses);
	} catch (error) {
		next(error);
	}
};
