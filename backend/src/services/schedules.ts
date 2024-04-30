import prisma from "./db";

export const getScheduleByCourse = async (courseId: string) => {
	try {
		const schelude = await prisma.schedule.findFirst({
			where: {
				courseId: courseId,
			},
		});

		return schelude;
	} catch (error) {
		console.error(error);
		throw new Error(`Failed to fetch: ${error.message}`);
	}
};

export const getAllScheludes = async () => {
	try {
		const scheludes = await prisma.schedule.findMany({});

		return scheludes;
	} catch (error) {
		console.error(error);
		throw new Error(`Failed to fetch: ${error.message}`);
	}
};
