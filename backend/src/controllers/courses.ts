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

export const createCourse: RequestHandler = async (req, res, next) => {
	const { name, groups } = req.body;
	console.log(req.body);

	try {
		const course = await CoursesService.createCourse(name, groups.split(","));
		res.status(200).json(course);
	} catch (error) {
		next(error);
	}
};

export const deleteCourse: RequestHandler = async (req, res, next) => {
	const id = req.params.id;
	try {
		const course = await CoursesService.deleteCourse(id);
		res.status(200).json(course);
	} catch (error) {
		next(error);
	}
};
