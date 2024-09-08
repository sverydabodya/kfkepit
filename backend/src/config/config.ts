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
		httpOnly: true,
		// secure: true,
	},
	rolling: true,
	store: sessionStore,
};

export const materialsMulterConfig: multer.Options = {
	limits: {
		fileSize: 25 * 1024 * 1024, // 25MB limit
	},
	fileFilter: function (req, file, cb) {
		try {
			if (
				file.mimetype !==
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
				file.mimetype !== "application/pdf" &&
				file.mimetype !== "application/msword"
			) {
				return cb(null, false);
			} else if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
				return cb(null, false);
			} else {
				cb(null, true);
			}
		} catch (error) {
			console.error(error);
		}
	},
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, path.join(__dirname, "..", "..", "/public/materials"));
			// cb(null, path.resolve(__dirname, "../../../public/materials"));
		},
		filename: function (req, file, cb) {
			file.originalname = Buffer.from(file.originalname, "latin1").toString(
				"utf8"
			);
			cb(null, file.originalname);
		},
	}),
};

export const postsMulterConfig: multer.Options = {
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, path.join(__dirname, "..", "..", "/public/images"));
			// cb(null, path.resolve(__dirname, "../../../public/images"));
		},
		filename: function (req, file, cb) {
			file.originalname = Buffer.from(file.originalname, "latin1").toString(
				"utf8"
			);
			cb(null, file.originalname);
		},
	}),
};

export const schedulesMulterConfig: multer.Options = {
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, path.join(__dirname, "..", "..", "/public/schedules"));
			// cb(null, path.resolve(__dirname, "../../../public/schedules"));
		},
		filename: function (req, file, cb) {
			file.originalname = Buffer.from(file.originalname, "latin1").toString(
				"utf8"
			);
			cb(null, file.originalname);
		},
	}),
};
