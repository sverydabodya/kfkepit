import { prisma } from "../services/db";

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
		throw new Error(`Failed to fetch: ${error.message}`);
	}
};
