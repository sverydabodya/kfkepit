import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import multer from "multer";
import path from "path";
import expressSession from "express-session";
import prisma from "../services/db";

const sessionSecret = process.env.SESSION_SECRET;

const sessionStore = new PrismaSessionStore(prisma, {
	checkPeriod: 2 * 60 * 1000,
	dbRecordIdIsSessionId: true,
	dbRecordIdFunction: undefined,
});

export const sesssionConfig: expressSession.SessionOptions = {
	secret: sessionSecret,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60 * 60 * 1000,
	},
	rolling: true,
	store: sessionStore,
};

export const multerConfig: multer.Options = {
	limits: {
		fileSize: 25 * 1024 * 1024, // 25MB limit
	},
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, path.join(__dirname, "..", "..", "/public/materials"));
		},
		filename: function (req, file, cb) {
			file.originalname = Buffer.from(file.originalname, "latin1").toString(
				"utf8"
			);
			cb(null, file.originalname);
		},
	}),
};

export const baseURL =
	process.env.PRODUCTION == "true"
		? "https://kkepit.onrender.com"
		: "http://localhost:5000";
