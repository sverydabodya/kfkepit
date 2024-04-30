import SessionUser from "../models/sessionUser";
import prisma from "./db";

export const getMaterialsBySubject = async (
	user: SessionUser,
	subjectName: string,
	page: string = null,
	take: number = 10
) => {
	try {
		const materials = await prisma.material.findMany({
			where: {
				subject: { name: subjectName },
				groupId: user.groupId,
			},
			orderBy: {
				createdAt: "desc",
			},
			take,
			skip: page ? parseInt(page) * take : 0,
		});

		return materials;
	} catch (error) {
		console.error(error);
		throw new Error(`Failed to fetch: ${error.message}`);
	}
};

export const getMaterialsByGroup = async (
	group: string,
	subject: string,
	user: SessionUser
) => {
	try {
		let materials;
		if (group === "all") {
			materials = await prisma.material.findMany({
				where: {
					authorId: user.id,
					subject: { name: subject },
				},
				orderBy: {
					createdAt: "desc",
				},
			});
		} else {
			materials = await prisma.material.findMany({
				where: {
					authorId: user.id,
					subject: { name: subject },
					group: { name: group },
				},
				orderBy: {
					createdAt: "desc",
				},
			});
		}

		return materials;
	} catch (error) {
		console.error(error);
		throw new Error(`Failed to fetch: ${error.message}`);
	}
};

export const newMaterial = async (
	materialName: string,
	authorId: string,
	groupName: string,
	subjectName: string,
	filesPaths: string[]
) => {
	try {
		//maybe will be better without transaction

		const [groupId, subjectId] = await prisma.$transaction([
			prisma.group.findFirst({
				where: { name: groupName },
				select: { id: true },
			}),
			prisma.subject.findFirst({
				where: { name: subjectName },
				select: { id: true },
			}),
		]);

		const material = await prisma.material.create({
			data: {
				name: materialName,
				files: filesPaths,
				authorId: authorId,
				groupId: groupId.id,
				subjectId: subjectId.id,
			},
		});

		return material;
	} catch (error) {
		throw new Error(`Failed to create material: ${error.message}`);
	}
};
