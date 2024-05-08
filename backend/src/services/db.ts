import { PrismaClient } from "@prisma/client";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "../../prisma/generated/types";
export * from "../../prisma/generated/types";

export const prisma = new PrismaClient();

export const kysely = new Kysely<DB>({
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: process.env.DB_URL,
		}),
	}),
});
