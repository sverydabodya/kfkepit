import prisma from "../services/db";
import { NextFunction, Request, RequestHandler, Response } from "express";
import Role from "../models/role";
import * as MaterialsService from "../services/materials";
import { baseURL } from "../config/config";

export const getAllMaterials: RequestHandler = async (req, res) => {
	const user = req.session.user;
	let materials;

	materials = await prisma.material.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	res.status(200).json(materials);
};

export const getMaterialById: RequestHandler = async (req, res, next) => {
	const materialId = req.params.id;

	try {
		const material = await prisma.material.findFirst({
			where: { id: materialId },
		});

		// res.render("sections/courses", { materials: material});
	} catch (error) {
		next(error);
	}
};

export const getMaterialsBySubject: RequestHandler = async (req, res, next) => {
	const subjectName = req.params.subject;
	const user = req.session.user;
	try {
		const [materials, groups] = await MaterialsService.getMaterialsBySubject(
			user,
			subjectName
		);

		if (materials.length === 0 && groups.length === 0) {
			res.redirect("/");
		}

		res.status(200).json(materials);
	} catch (error) {
		next(error);
	}
};

export const getMoreMaterials: RequestHandler<
	unknown,
	unknown,
	unknown,
	moreMaterialsQuery
> = async (req, res, next) => {
	const page = req.query.page;
	const subjectName = req.query.subject;
	const user = req.session.user;

	try {
		const [materials] = await MaterialsService.getMaterialsBySubject(
			user,
			subjectName,
			page
		);

		res.status(200).json(materials);
	} catch (error) {
		console.error(error);
	}
};

export const getMaterialsByGroup: RequestHandler<
	unknown,
	unknown,
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
	unknown,
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
