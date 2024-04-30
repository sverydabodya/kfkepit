import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";

export const errorHandler: ErrorRequestHandler = (
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(error);

	let errorMessage: string;
	let statusCode: number;

	if (isHttpError(error)) {
		statusCode = error.statusCode || 500;
		errorMessage = error.message || "An unknown error occurred";
	} else if (error instanceof Error) {
		statusCode = 500;
		errorMessage = error.message || "An unknown error occurred";
	} else {
		statusCode = 500;
		errorMessage = "An unknown error occurred";
	}

	res.status(statusCode).json({ error: errorMessage });
};
