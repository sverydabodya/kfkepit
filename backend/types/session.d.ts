import SessionUser from "../src/models/sessionUser";

declare module "express-session" {
	interface Session {
		user: SessionUser;
	}
}
