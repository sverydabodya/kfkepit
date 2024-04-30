import prisma from "../services/db";
import { NextFunction, Request, RequestHandler, Response } from "express";
import * as MaterialsService from "../services/materials";
import { Material } from "@prisma/client";

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
			res.status(404);
		}

		res.status(200).json(materials as Material[]);
	} catch (error) {
		next(error);
	}
};

export const getMoreMaterials: RequestHandler<
	unknown,
	Material[],
	unknown,
	moreMaterialsQuery
> = async (req, res, next) => {
	const page = req.query.page;
	const subjectName = req.query.subject;
	const user = req.session.user;

	try {
		const materials = await MaterialsService.getMaterialsBySubject(
			user,
			subjectName,
			page
		);

		res.status(200).json(materials as Material[]);
	} catch (error) {
		next(error);
	}
};

export const getMaterialsByGroup: RequestHandler<
	unknown,
	Material[],
	unknown,
	groupMaterialsQuery
> = async (req, res, next) => {
	const subject = req.query.subject;
	const group = req.query.group;
	const user = req.session.user;

	try {
		const materials = await MaterialsService.getMaterialsByGroup(
			group,
			subject,
			user
		);

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
