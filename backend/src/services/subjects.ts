import prisma from "./db";
import SessionUser from "../models/SessionUser";

export const getAllSubjects = async (user: SessionUser) => {
	try {
		const subjects = await prisma.group.findFirst({
			where: {
				id: user.groupId,
			},
			select: {
				subjects: true,
			},
		});

		return subjects.subjects;
	} catch (error) {
		console.error(error);
		throw new Error(`Failed to fetch: ${error.message}`);
	}
};
