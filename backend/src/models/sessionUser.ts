import { Role } from "@prisma/client";

type SessionUser = {
	id: string;
	username: string;
	role: Role;
	groupId?: string;
	groupName?: string;
	courseId?: string;
};

export default SessionUser;
