import prisma from "./db";
import path from "path";
import { promises as fs } from "fs";

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
		content = await saveImages(content);

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

function transliterate(text: string): string {
	const charMap: { [key: string]: string } = {
		А: "A",
		Б: "B",
		В: "V",
		Г: "H",
		Ґ: "G",
		Д: "D",
		Е: "E",
		Є: "Ye",
		Ж: "Zh",
		З: "Z",
		И: "Y",
		І: "I",
		Ї: "Yi",
		Й: "Y",
		К: "K",
		Л: "L",
		М: "M",
		Н: "N",
		О: "O",
		П: "P",
		Р: "R",
		С: "S",
		Т: "T",
		У: "U",
		Ф: "F",
		Х: "Kh",
		Ц: "Ts",
		Ч: "Ch",
		Ш: "Sh",
		Щ: "Shch",
		Ю: "Yu",
		Я: "Ya",
		а: "a",
		б: "b",
		в: "v",
		г: "h",
		ґ: "g",
		д: "d",
		е: "e",
		є: "ye",
		ж: "zh",
		з: "z",
		и: "y",
		і: "i",
		ї: "yi",
		й: "y",
		к: "k",
		л: "l",
		м: "m",
		н: "n",
		о: "o",
		п: "p",
		р: "r",
		с: "s",
		т: "t",
		у: "u",
		ф: "f",
		х: "kh",
		ц: "ts",
		ч: "ch",
		ш: "sh",
		щ: "shch",
		ю: "yu",
		я: "ya",
	};

	return text
		.split("")
		.map((char) => charMap[char] || char)
		.join("");
}

function createSlug(title: string): string {
	return transliterate(title)
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

async function saveImages(html: string): Promise<string> {
	const base64ImagePattern =
		/<img[^>]+src="data:image\/(png|jpeg|jpg);base64,([^"]+)"/g;
	let match;
	let updatedHtml = html;

	while ((match = base64ImagePattern.exec(html)) !== null) {
		const imageType = match[1];
		const base64Data = match[2];
		const imageBuffer = Buffer.from(base64Data, "base64");

		const fileName = `${generateImageName()}.${imageType}`;
		const filePath = path.join(
			path.resolve(__dirname, "../../../public/images"),
			fileName
		);

		try {
			await fs.writeFile(filePath, imageBuffer);
			const publicImagePath = `/images/${fileName}`;

			updatedHtml = updatedHtml.replace(
				match[0],
				`<img src="${publicImagePath}" />`
			);
		} catch (err) {
			console.error(`Помилка збереження файлу ${filePath}:`, err);
		}
	}

	return updatedHtml;
}

function generateImageName(): string {
	const datePart = new Date().toISOString().split("T")[0];
	const randomPart = Math.random().toString(36).substring(2, 14);

	return `${datePart}-${randomPart}`;
}
