import { RequestHandler } from "express";
import Role from "../models/role";
import * as ScheludesService from "../services/schedules";
import prisma from "../services/db";

export const getScheduleByCourse: RequestHandler = async (req, res, next) => {
	const user = req.session.user;
	const schedules = await ScheludesService.getAllScheludes();

	res.status(200).json(schedules);
};

export const getSchedule: RequestHandler = async (req, res, next) => {
	const path = req.params.path;
	const user = req.session.user;

	const schedule = await prisma.schedule.findFirst({
		where: {
			file: "schedules/" + path,
		},
	});

	res.status(200).json(schedule);
};
