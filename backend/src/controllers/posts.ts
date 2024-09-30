import { NextFunction, Request, RequestHandler, Response } from "express";
import * as PostsService from "../services/posts";
import createHttpError from "http-errors";

export const getPosts: RequestHandler = async (req, res, next) => {
	const page = req.query.page as string;
	try {
		const posts = await PostsService.getAllPosts(parseInt(page));

		if (posts.length === 0) {
			throw createHttpError(404, "Posts not found");
		}

		res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
};

export const getPost: RequestHandler = async (req, res, next) => {
	const slug = req.params.slug;

	try {
		const post = await PostsService.getPostBySlug(slug);

		if (post.length === 0) {
			throw createHttpError(404, "Post not found");
		}

		res.status(200).json(post);
	} catch (error) {
		next(error);
	}
};

export const createPost: RequestHandler = async (
	req: Request & MulterRequest,
	res: Response,
	next: NextFunction
) => {
	const cover = "images/" + req.file?.originalname;
	const title = req.body.title;
	const content = req.body.content;

	try {
		const post = await PostsService.createPost(title, content, cover);
		res.status(200).json(post);
	} catch (error) {
		next(error);
	}
};

export const deletePost: RequestHandler = async (req, res, next) => {
	const postId = req.params.id;

	try {
		const post = await PostsService.deletePost(postId);
		res.status(200).json(post);
	} catch (error) {
		next(error);
	}
};
