import { User } from "../model/user";
import { ConflictError, UnauthorizedError } from "../errors/http_errors";


async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, {credentials:"include", ...init});
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
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        }
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("http://localhost:1488/api/v1/users", { method: "GET"});
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string,
    rememberMe: boolean
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("http://localhost:1488/api/v1/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            
            body: JSON.stringify(credentials),
        });
        const user = await response.json();

        if (credentials.rememberMe) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
        }
    
        return user;
    
}

export async function logout() {
    await fetchData("http://localhost:1488/api/v1/users/logout", { method: "POST" });
    localStorage.removeItem("loggedInUser");
}