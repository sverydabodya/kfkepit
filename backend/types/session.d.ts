import { SessionUser } from "../src/models/SessionUser";

declare module "express-session" {
	interface Session {
		user: SessionUser;
	}
}
