import prisma from "./db";

export const getAllPosts = async () => {
	try {
		const posts = await prisma.post.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		return posts;
	} catch (error) {
		throw new Error(`Failed to fetch posts`);
	}
};

export const getPostBySlug = async (slug: string) => {
	try {
		const post = await prisma.post.findMany({
			where: {
				slug,
			},
		});

		return post;
	} catch (error) {
		throw new Error(`Failed to fetch post with slug: ${slug}`);
	}
};

export const createPost = async (
	title: string,
	content: string,
	cover: string
) => {
	try {
		const slug = createSlug(title);
		const post = await prisma.post.create({
			data: {
				title,
				content,
				cover,
				slug,
			},
		});

		return post;
	} catch (error) {
		throw new Error(`Failed to create post`);
	}
};

export const deletePost = async (id: string) => {
	try {
		const post = await prisma.post.delete({
			where: {
				id,
			},
		});
		return post;
	} catch (error) {
		throw new Error(`Failed to delete post with id: ${id}`);
	}
};

function createSlug(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}
