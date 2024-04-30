import prisma from "../services/db";
import { NextFunction, Request, RequestHandler, Response } from "express";
import * as MaterialsService from "../services/materials";
import { Material } from "@prisma/client";
import createHttpError from "http-errors";

export const getAllMaterials: RequestHandler = async (req, res, next) => {
	try {
		const materials = await prisma.material.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		res.status(200).json(materials);
	} catch (error) {
		next(error);
	}
};

export const getMaterialById: RequestHandler = async (req, res, next) => {
	const materialId = req.params.id;

	try {
		const material = await prisma.material.findFirst({
			where: { id: materialId },
		});
	} catch (error) {
		next(error);
	}
};

export const getMaterialsBySubject: RequestHandler<
	{ subject: string },
	Material[]
> = async (req, res, next) => {
	const subjectName = req.params.subject;
	const user = req.session.user;
	try {
		const materials = await MaterialsService.getMaterialsBySubject(
			user,
			subjectName
		);

		if (materials.length === 0) {
			throw createHttpError(404, "Materials not found");
		}
		res.status(200).json(materials);
	} catch (error) {
		next(error);
	}
};

export const getMoreMaterials: RequestHandler<
	any,
	Material[],
	unknown,
	moreMaterialsQuery
> = async (req, res, next) => {
	const page = req.params.page;
	const subjectName = req.query.subject;
	const user = req.session.user;

	try {
		const materials = await MaterialsService.getMaterialsBySubject(
			user,
			subjectName,
			page
		);

		if (materials.length === 0) {
			throw createHttpError(404, "Materials not found");
		}

		res.status(200).json(materials);
	} catch (error) {
		next(error);
	}
};

export const getMaterialsByGroup: RequestHandler<
	any,
	Material[],
	unknown,
	groupMaterialsQuery
> = async (req, res, next) => {
	const subject = req.query.subject;
	const group = req.params.group;
	const user = req.session.user;

	console.log(subject, group);

	try {
		const materials = await MaterialsService.getMaterialsByGroup(
			group,
			subject,
			user
		);

		if (materials.length === 0) {
			throw createHttpError(404, "Materials not found");
		}

		res.status(200).json(materials);
	} catch (error) {
		next(error);
	}
};

export const newMaterial: RequestHandler<
	unknown,
	Material,
	newMaterialBody
> = async (req: Request & MulterRequest, res: Response, next: NextFunction) => {
	const materialName = req.body.materialName;
	const group = req.body.group;
	const subject = req.body.subject;
	const user = req.session.user;

	try {
		const filesPaths: string[] = [];
		for (const key in req.files) {
			if (Object.prototype.hasOwnProperty.call(req.files, key)) {
				const fileArray = req.files[key];
				for (const file of fileArray) {
					filesPaths.push("materials/" + file.originalname);
				}
			}
		}

		const material = await MaterialsService.newMaterial(
			materialName,
			user.id,
			group,
			subject,
			filesPaths
		);

		res.status(200).json(material);
	} catch (error) {
		next(error);
	}
};
