import Role from "../models/role";
import SessionUser from "../models/sessionUser";
import prisma from "./db";

export const getMaterialsBySubject = async (
	user: SessionUser,
	subjectName: string,
	page: string = null,
	take: number = 10
) => {
	try {
		if (user.role === Role.Teacher) {
			//maybe will be better without transaction
			const [materials, groups] = await prisma.$transaction([
				prisma.material.findMany({
					where: {
						subject: {
							name: subjectName,
						},
						authorId: user.id,
					},
					orderBy: {
						createdAt: "desc",
					},
					take,
					skip: page ? parseInt(page) * take : 0,
				}),
				prisma.group.findMany({
					where: {
						subjects: {
							some: {
								name: subjectName,
							},
						},
					},
				}),
			]);

			return [materials, groups];
		} else {
			const materials = await prisma.material.findMany({
				where: {
					subject: { name: subjectName },
					groupId: user.groupId,
				},
				orderBy: {
					createdAt: "desc",
				},
			});

			return [materials];
		}
	} catch (error) {
		console.error(error);
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
