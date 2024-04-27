import prisma from "./db";
import SessionUser from "../models/sessionUser";

export const getAllSubjects = async (user: SessionUser) => {
	const subjects = await prisma.group.findFirst({
		where: {
			id: user.groupId,
		},
		select: {
			subjects: true,
		},
	});

	return subjects.subjects;
};
