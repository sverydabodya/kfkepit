import prisma from "./db";

export const getAllCourses = async () => {
	try {
		const courses = await prisma.course.findMany();
		return courses;
	} catch (error) {
		throw new Error(`Failed to fetch courses`);
	}
};

export const createCourse = async (name: string, groups: string[]) => {
	try {
		const course = await prisma.course.create({
			data: {
				name,
				...(groups && {
					groups: {
						connect: groups.map((groupId) => ({ id: groupId })),
					},
				}),
			},
		});
		return course;
	} catch (error) {
		throw new Error(`Failed to create course`);
	}
};

export const deleteCourse = async (id: string) => {
	try {
		const course = await prisma.course.delete({
			where: {
				id,
			},
		});
		return course;
	} catch (error) {
		throw new Error(`Failed to delete course`);
	}
};
