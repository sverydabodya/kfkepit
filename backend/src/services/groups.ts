import prisma from "./db";

export const getAllGroups = async () => {
	try {
		const groups = await prisma.group.findMany();
		return groups;
	} catch (error) {
		throw new Error(`Failed to fetch groups`);
	}
};

export const createGroup = async (
	name: string,
	courseId: string,
	subjects: string[]
) => {
	try {
		const group = await prisma.group.create({
			data: {
				name,
				...(subjects && {
					subjects: {
						connect: subjects.map((subjectId) => ({ id: subjectId })),
					},
				}),
				courseId,
			},
		});

		return group;
	} catch (error) {
		throw new Error("Failed to create group");
	}
};

export const deleteGroup = async (id: string) => {
	try {
		const group = await prisma.group.delete({ where: { id } });
		return group;
	} catch (error) {
		throw new Error("Failed to delete group with id " + id);
	}
};
