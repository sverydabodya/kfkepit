import prisma from "./db";

export const getAllGroups = async () => {
	try {
		const groups = await prisma.group.findMany();
		return groups;
	} catch (error) {
		throw new Error(`Failed to fetch groups`);
	}
};
