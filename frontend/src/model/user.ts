export interface User {
    id: string;
    username: string;
    role: string;
    groupId?: string;
    groupName?: string;
    courseId?: string;
}