import { RequestHandler } from "express";
import * as ScheludesService from "../services/schedules";
import prisma from "../services/db";
import createHttpError from "http-errors";

export const getAllSchedules: RequestHandler = async (req, res, next) => {
	try {
		const schedules = await ScheludesService.getAllScheludes();

		if (schedules.length === 0) {
			throw createHttpError(404, "Schedules not found");
		}

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

		if (!schedule) {
			throw createHttpError(404, "Schedule not found");
		}

		res.status(200).json(schedule);
	} catch (error) {
		next(error);
	}
};
