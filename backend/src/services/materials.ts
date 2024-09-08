import prisma from "./db";

export const getAllMaterials = async () => {
	try {
		const materials = await prisma.material.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		return materials;
	} catch (error) {
		throw new Error(`Failed to fetch materials`);
	}
};

export const getMaterialById = async (materialId: string) => {
	try {
		const material = await prisma.material.findFirst({
			where: { id: materialId },
		});

		return material;
	} catch (error) {
		throw new Error(`Failed to fetch material`);
	}
};

export const getMaterialsBySubject = async (
	groupId: string,
	subjectName: string,
	page: string = null,
	take: number = 10
) => {
	try {
		const materials = await prisma.material.findMany({
			where: {
				subject: { name: subjectName },
				groups: { some: { id: groupId } },
			},
			include: {
				groups: true,
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
		throw new Error(`Failed to fetch materials`);
	}
};

export const getMaterialsByGroup = async (
	groups: string[],
	subject: string,
	userId: string,
	page: string = null,
	take: number = 10
) => {
	try {
		let materials;
		if (groups[0] === "all") {
			materials = await prisma.material.findMany({
				where: {
					authorId: userId,
					subject: { name: subject },
				},
				include: {
					groups: true,
				},
				orderBy: {
					createdAt: "desc",
				},
				take,
				skip: page ? parseInt(page) * take : 0,
			});
		} else {
			materials = await prisma.material.findMany({
				where: {
					authorId: userId,
					subject: { name: subject },
					groups: { some: { name: { in: groups } } },
				},
				orderBy: {
					createdAt: "desc",
				},
				include: {
                    groups: true,
                },
				take,
				skip: page ? parseInt(page) * take : 0,
			});
		}

		return materials;
	} catch (error) {
		console.error(error);
		throw new Error(`Failed to fetch materials`);
	}
};

export const newMaterial = async (
	materialName: string,
	authorId: string,
	groups: string[],
	subjectName: string,
	filesPaths: string[]
) => {
	try {
		const subjectId = await prisma.subject.findFirst({
			where: { name: subjectName },
			select: { id: true },
		});

		if (!subjectId) {
			throw new Error(`Subject with name "${subjectName}" not found.`);
		}

		const groupConnections = await prisma.group.findMany({
			where: {
				name: {
					in: groups,
				},
			},
			select: {
				id: true,
			},
		});

		if (groupConnections.length !== groups.length) {
			throw new Error(`One or more groups were not found.`);
		}

		const material = await prisma.material.create({
			data: {
				name: materialName,
				files: filesPaths,
				authorId: authorId,
				groups: {
					connect: groupConnections.map((group) => ({ id: group.id })),
				},
				subjectId: subjectId.id,
			},
		});

		return material;
	} catch (error) {
		throw new Error(`Failed to create material`);
	}
};

export const deleteMaterial = async (materialId: string) => {
	try {
		const material = await prisma.material.delete({
			where: { id: materialId },
		});

		return material;
	} catch (error) {
		throw new Error(`Failed to delete material`);
	}
};
