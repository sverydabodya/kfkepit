import prisma from "./db";

export const getScheduleByCourseId = async (courseId: string) => {
  try {
    const schelude = await prisma.schedule.findFirst({
      where: {
        courseId,
      },
    });

    return schelude;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch schedule`);
  }
};

export const getAllScheludes = async () => {
  try {
    const scheludes = await prisma.schedule.findMany({
      include: { course: true },
    });

    return scheludes;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch schedules`);
  }
};

export const createSchedule = async (
  name: string,
  file: string,
  course: string
) => {
  try {
    console.log(course);
    const courseExists = await prisma.course.findUnique({
      where: { id: course },
    });

    if (!courseExists) {
      throw new Error(`Course with id ${course} does not exist`);
    }

    const schedule = await prisma.schedule.create({
      data: {
        name,
        file,
        courseId: course,
      },
    });

    return schedule;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to create schedule`);
  }
};

export const deleteSchedule = async (id: string) => {
  try {
    const schedule = await prisma.schedule.delete({
      where: { id },
    });

    return schedule;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to delete schedule`);
  }
};
