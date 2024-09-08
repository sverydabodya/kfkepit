import { Role } from "@prisma/client";

export type SessionUser = {
	id: string;
	username: string;
	role: Role;
	groupId?: string;
	groupName?: string;
	courseId?: string;
};

