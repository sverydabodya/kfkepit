import prisma from "./db";

export const getScheduleByCourse = async (courseId: string) => {
	const schelude = await prisma.schedule.findFirst({
		where: {
			courseId: courseId,
		},
	});

	return schelude;
};

export const getAllScheludes = async () => {
	const scheludes = await prisma.schedule.findMany({});

	return scheludes;
};
