import { RequestHandler } from "express";
import * as ScheludesService from "../services/schedules";
import prisma from "../services/db";

export const getScheduleByCourse: RequestHandler = async (req, res, next) => {
	try {
		const schedules = await ScheludesService.getAllScheludes();

		res.status(200).json(schedules);
	} catch (error) {
		next(error);
	}
};

export const getSchedule: RequestHandler = async (req, res, next) => {
	const path = req.params.path;

	try {
		const schedule = await prisma.schedule.findFirst({
			where: {
				file: "schedules/" + path,
			},
		});

		res.status(200).json(schedule);
	} catch (error) {
		next(error);
	}
};
