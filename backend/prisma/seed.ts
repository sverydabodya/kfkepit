import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
	{
		name: "bogdan",
		pass: "123",
		role: "teacher",
		subjects: {
			create: {
				name: "math",
				groups: {
					create: {
						name: "ki-31",
					},
				},
			},
		},
	},
	{
		name: "oleg",
		pass: "123",
		role: "student",
		// group: {
		// 	connectOrCreate: {
		// 		where: {
		// 			id: "ki-31",
		// 		},
		// 		create: {
		// 			name: "ki-31",
		// 		},
		// 	},
		// },
	},
	{
		name: "roman",
		pass: "123",
		role: "student",
		// group: {
		// 	connectOrCreate: {
		// 		where: {
		// 			name: "ki-31",
		// 		},
		// 		create: {
		// 			name: "ki-31",
		// 		},
		// 	},
		// },
	},
];

// const userIds = await prisma.user
// 	.findMany()
// 	.then((users) => users.map((user) => user.id));

// const groupData: Prisma.GroupCreateInput[] = [
// 	{
// 		name: "ki-31",
// 		students: {
// 			connect: userIds.map((id) => ({ id })),
// 		},
// 	},
// 	{
// 		name: "ki-41",
// 		students: {
// 			connect: userIds.map((id) => ({ id })),
// 		},
// 	},
// ];

// const groupIds = await prisma.group
// 	.findMany()
// 	.then((groups) => groups.map((group) => group.id));

// const subjectData: Prisma.SubjectCreateInput[] = [
// 	{
// 		name: "math",
// 		teacher: {
// 			connect: { id: userIds[0] },
// 		},
// 		groups: {
// 			connect: async () => {
// 				const group = await prisma.group.findFirst({ where: { name: "ki-31" } });
// 				if (group) {
// 					return { id: group.id };
// 				} else {
// 					throw new Error("Group 'ki-31' not found.");
// 				}
// 			},

// 		},
// 	},
// 	{
// 		name: "ukr",
// 		teacher: {
// 			connect: { id: userIds[0] },
// 		},
// 		groups: {
// 			connect: { id: groupIds[1] },
// 		},
// 	},
// ];

// const subjectIds = await prisma.subject
// 	.findMany()
// 	.then((subject) => subject.map((subject) => subject.id));

// const materialData: Prisma.MaterialCreateInput[] = [
// 	{
// 		name: "material",
// 		files: ["materials/Щоденник_КІ_2024.doc"],
// 		author: {
// 			connect: { id: userIds[0] },
// 		},
// 		group: {
// 			connect: { id: groupIds[0] },
// 		},
// 		subject: {
// 			connect: { id: subjectIds[0] },
// 		},
// 	},
// ];

async function main() {
	console.log(`Start seeding ...`);
	for (const u of userData) {
		const user = await prisma.user.create({
			data: u,
		});
		console.log(`Created user with id: ${user.id}`);
	}

	// for (const u of groupData) {
	// 	const group = await prisma.group.create({
	// 		data: u,
	// 	});
	// 	console.log(`Created group with id: ${group.id}`);
	// }

	// for (const u of subjectData) {
	// 	const subject = await prisma.subject.create({
	// 		data: u,
	// 	});
	// 	console.log(`Created subject with id: ${subject.id}`);
	// }

	// for (const u of materialData) {
	// 	const material = await prisma.material.create({
	// 		data: u,
	// 	});
	// 	console.log(`Created material with id: ${material.id}`);
	// }

	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
