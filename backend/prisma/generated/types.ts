import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const Role = {
    student: "student",
    teacher: "teacher",
    admin: "admin"
} as const;
export type Role = (typeof Role)[keyof typeof Role];
export type Course = {
    id: string;
    name: string;
};
export type Group = {
    id: string;
    name: string;
    courseId: string;
};
export type GroupToSubject = {
    A: string;
    B: string;
};
export type Material = {
    id: string;
    name: string;
    files: Generated<string[]>;
    authorId: string;
    groupId: string | null;
    subjectId: string;
    createdAt: Generated<Timestamp>;
};
export type Schedule = {
    id: string;
    name: string;
    file: string;
    courseId: string;
    createdAt: Generated<Timestamp>;
};
export type Session = {
    id: string;
    sid: string;
    data: string;
    expiresAt: Timestamp;
};
export type Subject = {
    id: string;
    name: string;
    teacherId: string;
};
export type User = {
    id: string;
    name: string;
    pass: string;
    role: Role;
    courseId: string | null;
    groupId: string | null;
};
export type DB = {
    _GroupToSubject: GroupToSubject;
    Course: Course;
    Group: Group;
    Material: Material;
    Schedule: Schedule;
    Session: Session;
    Subject: Subject;
    User: User;
};
