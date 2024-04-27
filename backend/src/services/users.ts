import prisma from "../services/db";

export const getUser = async (username: string, password: string) => {
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
};
