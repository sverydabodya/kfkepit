import { User } from "../model/user";
import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Item } from "../components/UI-SubjectPage/MainMaterial/MainMaterial";
import { createdItem } from "../components/UI-SubjectPage/AddItemForm/AddItemForm";

async function fetchData(input: RequestInfo, init?: RequestInit) {
	const response = await fetch(input, { credentials: "include", ...init });
	if (response.ok) {
		return response;
	} else {
		const errorBody = await response.json();
		const errorMessage = errorBody.error;
		if (response.status === 401) {
			throw new UnauthorizedError(errorMessage);
		} else if (response.status === 409) {
			throw new ConflictError(errorMessage);
		} else {
			throw Error(
				"Request failed with status: " +
					response.status +
					" message: " +
					errorMessage
			);
		}
	}
}

export async function getLoggedInUser(): Promise<User> {
	const response = await fetchData(
		`${import.meta.env.VITE_HOST}/api/v1/users`,
		{ method: "GET" }
	);
	return response.json();
}

export interface LoginCredentials {
	username: string;
	password: string;
	rememberMe: boolean;
}

export async function login(credentials: LoginCredentials): Promise<User> {
	const response = await fetchData(
		`${import.meta.env.VITE_HOST}/api/v1/users/login`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify(credentials),
		}
	);
	const user = await response.json();

	if (credentials.rememberMe) {
		localStorage.setItem("loggedInUser", JSON.stringify(user));
	}

	return user;
}
export async function getSubjects() {
	const response = await fetchData(
		`${import.meta.env.VITE_HOST}/api/v1/subjects`,
		{ method: "GET" }
	);
	const subjects = await response.json();
	return subjects;
}

export async function getMaterialsBySubject(user: User, subject: string) {
	const response = await fetchData(
		`${import.meta.env.VITE_HOST}/api/v1/materials/subject/${subject}?group=${
			user.groupName
		}`,
		{ method: "GET" }
	);
	const materials = await response.json();
	return materials;
}

export async function createMaterial(newMaterial: createdItem) {
	const formData = new FormData();
	formData.append("materialName", newMaterial.name);
	formData.append("subject", newMaterial.subject);
	formData.append(
		"groups",
		newMaterial.groups.map((group) => group.name).join(",")
	);

	newMaterial.files.forEach((file, index) => {
		formData.append(`file${index + 1}`, file);
	});

	try {
		const response = await fetchData(
			`${import.meta.env.VITE_HOST}/api/v1/materials/`,
			{
				method: "POST",
				body: formData,
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error("There was a problem with the fetch operation:", error);
		throw error;
	}
}

export async function logout() {
	await fetchData(`${import.meta.env.VITE_HOST}/api/v1/users/logout`, {
		method: "POST",
	});
	localStorage.removeItem("loggedInUser");
}

export async function getGroups() {
	const response = await fetchData(
		`${import.meta.env.VITE_HOST}/api/v1/groups`,
		{ method: "GET" }
	);
	const groups = await response.json();
	return groups;
}
