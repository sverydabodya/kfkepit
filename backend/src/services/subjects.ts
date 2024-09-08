import prisma from "./db";

export const getAllSubjects = async (groupId: string) => {
	try {
		const subjects = await prisma.group.findFirst({
			where: {
				id: groupId,
			},
			select: {
				subjects: true,
			},
		});

		return subjects.subjects;
	} catch (error) {
		console.error(error);
		throw new Error(`Failed to fetch subjects`);
	}
};
