import { Role } from "@prisma/client";
import prisma from "../services/db";

type UserParams = {
	role?: Role;
	courseId?: string;
	groupId?: string;
	name?: string;
};

export const getAllUsers = async (
	params: UserParams,
	page: number = null,
	take: number = 10
) => {
	try {
		const users = await prisma.user.findMany({
			where: {
				...params,
			},
			take,
			skip: page ? page * take : 0,
		});
		const sanitizedUsers = users.map(({ pass, ...user }) => ({ ...user }));

		return sanitizedUsers;
	} catch (error) {
		console.error(error);
		throw new Error(`Failed to fetch users`);
	}
};

export const getUser = async (username: string, password: string) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				name: username,
				pass: password,
			},
			include: {
				group: true,
			},
		});

		return user;
	} catch (error) {
		console.error(error);
		throw new Error(`Failed to fetch user`);
	}
};

export const createUser = async (
	name: string,
	role: Role,
	groupId: string,
	courseId: string,
	subjects: string
) => {
	const filteredSubjects = subjects.split(",").map((subject) => {
		return {
			id: subject,
		};
	});

	try {
		let user;
		if (courseId && groupId) {
			user = await prisma.user.create({
				data: {
					name,
					role,
					pass: "123",
					group: {
						connect: {
							id: groupId,
						},
					},
					course: {
						connect: {
							id: courseId,
						},
					},
				},
			});
		} else {
			user = await prisma.user.create({
				data: {
					name,
					role,
					pass: "123",
					subjects: {
						connect: filteredSubjects,
					},
				},
			});
		}

		return user;
	} catch (error) {
		console.error(error);
		throw new Error(`Failed to create user`);
	}
};

export const deleteUser = async (id: string) => {
	try {
		const user = await prisma.user.delete({
			where: {
				id,
			},
		});

		return user;
	} catch (error) {
		console.error(error);
		throw new Error(`Failed to delete user`);
	}
};

export const updateUser = async (
	id: string,
	name: string,
	role: Role,
	groupId: string,
	courseId: string,
	subjects: string
) => {
	const filteredSubjects =
		subjects &&
		subjects.split(",").map((subject) => {
			return {
				id: subject,
			};
		});

	try {
		const user = await prisma.user.update({
			where: {
				id,
			},
			data: {
				...(name && { name }),
				...(role && { role }),
				...(groupId && {
					group: {
						connect: {
							id: groupId,
						},
					},
				}),
				...(courseId && {
					course: {
						connect: {
							id: courseId,
						},
					},
				}),
				...(filteredSubjects &&
					filteredSubjects.length && {
						subjects: {
							connect: filteredSubjects,
						},
					}),
			},
		});

		return user;
	} catch (error) {
		console.error(error);
		throw new Error(`Failed to update user`);
	}
};
