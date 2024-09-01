import SessionUser from "../models/SessionUser";
import { RequestHandler } from "express";
import { Role } from "@prisma/client";
import createHttpError from "http-errors";
import * as UserService from "../services/users";



type LoginBody = {
	username: string;
	password: string;
	rememberMe: string;
};

export const getAuthenticatedUser: RequestHandler = (req, res, next) => {
	try {
		res.status(200).json(req.session.user);
	} catch (error) {
		next(error);
	}
};

export const login: RequestHandler<unknown, unknown, LoginBody> = async (
	req,
	res,
	next
) => {
	const username = req.body.username;
	const password = req.body.password;
	const rememberMe = req.body.rememberMe;

	try {
		if (!username || !password) {
			throw createHttpError(400, "Params missing");
		}

		const user = await UserService.getUser(username, password);

		if (!user) {
			throw createHttpError(401, "Invalid credentials");
		}

		let sessionUser: SessionUser;
		if (user.role === Role.student) {
			sessionUser = {
				id: user.id,
				username: user.name,
				role: user.role,
				groupId: user.groupId,
				groupName: user.group?.name,
				courseId: user.courseId,
			};
		} else {
			sessionUser = {
				id: user.id,
				username: user.name,
				role: user.role,
			};
		}

		req.session.user = sessionUser;
		if (rememberMe === "on")
			req.session.cookie.maxAge = 365 * 24 * 60 * 60 * 1000; // 1 year

		req.session.save(() => {
			res.status(200).json(sessionUser);
		});
	} catch (error) {
		next(error);
	}
};

export const logout: RequestHandler = (req, res, next) => {
	req.session.destroy((error) => {
		if (error) {
			next(error);
		} else {
			res.status(200).json({ success: true });
		}
	});
};
