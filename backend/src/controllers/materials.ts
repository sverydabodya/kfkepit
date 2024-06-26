import { NextFunction, Request, RequestHandler, Response } from "express";
import * as MaterialsService from "../services/materials";
import { Material, Prisma } from "@prisma/client";
import createHttpError from "http-errors";

interface groupMaterialsQuery {
	subject: string;
	page?: string;
}

interface newMaterialBody {
	materialName: string;
	group: string;
	subject: string;
}

export const getAllMaterials: RequestHandler = async (req, res, next) => {
	try {
		const materials = await MaterialsService.getAllMaterials();

		if (!materials) {
			throw createHttpError(404, "Materials not found");
		}

		res.status(200).json(materials);
	} catch (error) {
		next(error);
	}
};

export const getMaterialById: RequestHandler = async (req, res, next) => {
	const materialId = req.params.id;

	try {
		const material = await MaterialsService.getMaterialById(materialId);

		if (!material) {
			throw createHttpError(404, "Material not found");
		}

		res.status(200).json(material);
	} catch (error) {
		next(error);
	}
};

export const getMaterialsBySubject: RequestHandler<
	{ subject: string },
	Material[],
	unknown,
	{ page?: string }
> = async (req, res, next) => {
	const subjectName = req.params.subject;
	const user = req.session.user;
	const page = req.query.page;

	try {
		const materials = await MaterialsService.getMaterialsBySubject(
			user.groupId,
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
	any
> = async (req, res, next) => {
	const subject = req.query.subject;
	const page = req.query.page;
	const group = req.params.group;
	const user = req.session.user;

	try {
		const materials = await MaterialsService.getMaterialsByGroup(
			group,
			subject,
			user.id,
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

export const newMaterial: RequestHandler<
	unknown,
	Material,
	Prisma.MaterialCreateInput
> = async (req: Request & MulterRequest, res: Response, next: NextFunction) => {
	const materialName = req.body.materialName;
	const group = req.body.group;
	const subject = req.body.subject;
	const user = req.session.user;

	try {
		const filesPaths: string[] = [];

		if (Object.keys(req.files).length === 0) {
			throw createHttpError(400, "Invalid file type");
		}

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

export const deleteMaterial: RequestHandler = async (req, res, next) => {
	const materialId = req.params.id;

	try {
		const material = await MaterialsService.deleteMaterial(materialId);

		if (!material) {
			throw createHttpError(404, "Material not found");
		}

		res.status(200).json({ success: true });
	} catch (error) {
		next(error);
	}
};
