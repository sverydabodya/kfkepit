import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { z } from "zod";

interface Schema {
	body?: z.ZodObject<any>;
	params?: z.ZodObject<any>;
	query?: z.ZodObject<any>;
}

export const validateRequest = (schema: Schema) => {
	return function (req: Request, res: Response, next: NextFunction) {
		let hasError = false;

		if (schema.body) {
			const result = schema.body.safeParse(req.body);

			if (!result.success) {
				hasError = true;
				throw createHttpError(
					400,
					"Invalid request body: " + JSON.stringify(result.error.format())
				);
			}
		}

		if (schema.params) {
			const result = schema.params.safeParse(req.params);

			if (!result.success) {
				hasError = true;
				throw createHttpError(
					400,
					"Invalid request params: " + JSON.stringify(result.error.format())
				);
			}
		}

		if (schema.query) {
			const result = schema.query.safeParse(req.query);

			if (!result.success) {
				hasError = true;
				throw createHttpError(
					400,
					"Invalid request query: " + JSON.stringify(result.error.format())
				);
			}
		}

		if (!hasError) {
			next();
		}
	};
};
