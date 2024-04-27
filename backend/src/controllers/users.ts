import { RequestHandler } from "express";
import SessionUser from "../models/sessionUser";
import Role from "../models/role";
import * as UserService from "../services/users";
import createHttpError from "http-errors";

export const login: RequestHandler<unknown, unknown, LoginBody> = async (
	req,
	res
) => {
	const username = req.body.username;
	const password = req.body.password;
	const rememberMe = req.body.rememberMe;

	if (!username || !password) {
		throw createHttpError(400, "Params missing");
	}

	const user = await UserService.getUser(username, password);

	if (!user) {
		throw createHttpError(401, "Invalid credentials");
	}

	let sessionUser: SessionUser;
	if (user.role === Role.Student) {
		sessionUser = {
			id: user.id,
			username: user.name,
			role: user.role as Role,
			groupId: user.groupId,
			groupName: user.group?.name,
			courseId: user.courseId,
		};
	} else {
		sessionUser = {
			id: user.id,
			username: user.name,
			role: user.role as Role,
		};
	}

	req.session.user = sessionUser;
	if (rememberMe === "on") req.session.cookie.maxAge = null;

	req.session.save(() => {
		res.status(200).json(user);
	});
};

export const logout: RequestHandler = (req, res, next) => {
	req.session.destroy((error) => {
		if (error) {
			next(error);
		} else {
			res.redirect("/auth");
		}
	});
};
