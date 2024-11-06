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

export const createSubject = async (
	name: string,
	teacherId: string,
	groups: string[]
) => {
	try {
		const subject = await prisma.subject.create({
			data: {
				name,
				teacherId,
				...(groups && {
					groups: {
						connect: groups.map((groupId) => ({ id: groupId })),
					},
				}),
			},
		});

		return subject;
	} catch (error) {
		throw new Error("Failed to create subject");
	}
};

export const deleteSubject = async (id: string) => {
	try {
		const subject = await prisma.subject.delete({ where: { id } });
		return subject;
	} catch (error) {
		throw new Error("Failed to delete subject with id " + id);
	}
};
