import { RequestHandler } from "express";
import * as GroupsService from "../services/groups";

export const getAllGroups: RequestHandler = async (req, res, next) => {
	try {
		const groups = await GroupsService.getAllGroups();
		res.status(200).json(groups);
	} catch (error) {
		next(error);
	}
};

export const createGroup: RequestHandler = async (req, res, next) => {
	const { name, courseId, subjects } = req.body;
	try {
		const group = await GroupsService.createGroup(
			name,
			courseId,
			subjects.split(",")
		);
		res.status(200).json(group);
	} catch (error) {
		next(error);
	}
};

export const deleteGroup: RequestHandler = async (req, res, next) => {
	const id = req.params.id;

	try {
		const group = await GroupsService.deleteGroup(id);
		res.json(group).status(200);
	} catch (error) {
		next(error);
	}
};
