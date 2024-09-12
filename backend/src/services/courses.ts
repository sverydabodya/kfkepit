import prisma from "./db";

export const getAllCourses = async () => {
	try {
		const courses = await prisma.course.findMany();
		return courses;
	} catch (error) {
		throw new Error(`Failed to fetch courses`);
	}
};
