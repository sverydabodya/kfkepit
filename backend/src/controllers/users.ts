import { RequestHandler } from "express";
import * as UsersService from "../services/users";
import { Role } from "@prisma/client";

export const getAllUsers: RequestHandler = async (req, res, next) => {
	const { page, role, groupId, courseId, name } = req.query;
	const parsedPage = page ? parseInt(page as string) : null;

	try {
		const users = await UsersService.getAllUsers(
			{
				role: role as Role,
				groupId: groupId as string,
				courseId: courseId as string,
				name: name as string,
			},
			parsedPage
		);
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const getRoles: RequestHandler = async (req, res, next) => {
	try {
		res.json(Role);
	} catch (error) {
		next(error);
	}
};

export const createUser: RequestHandler = async (req, res, next) => {
	const { name, role, groupId, courseId, subjects } = req.body;
	try {
		const user = await UsersService.createUser(
			name,
			role,
			groupId,
			courseId,
			subjects
		);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export const deleteUser: RequestHandler = async (req, res, next) => {
	const id = req.params.id;
	console.log(id);

	try {
		const user = await UsersService.deleteUser(id);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export const updateUser: RequestHandler = async (req, res, next) => {
	const id = req.params.id;
	const { name, role, groupId, courseId, subjects } = req.body;
	console.log(req.body);
	

	try {
		const user = await UsersService.updateUser(
			id,
			name,
			role,
			groupId,
			courseId,
			subjects
		);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};
