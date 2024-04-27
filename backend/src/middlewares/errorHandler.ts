import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";

export const errorHandler: ErrorRequestHandler = (
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(error);
	let errorMessage = "An unknown error";
	let statusCode = 500;
	if (isHttpError(error)) {
		statusCode = error.status;
		errorMessage = error.message;
	}
	res.status(statusCode).json({ error: errorMessage });
};
