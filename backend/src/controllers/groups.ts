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
