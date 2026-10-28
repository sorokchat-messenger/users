import type { Id, User } from "../models/index.js";

export interface IUserRepository {
    getById(id: Id): Promise<User | null>;
    getByTerm(term: string, limit: number, offset: number): Promise<User[]>;
    existsByLogin(login: string): Promise<boolean>;
    save(user: User): Promise<void>;
    delete(id: Id): Promise<void>;
}

export const USER_REPOSITORY_TOKEN: string = "USER_REPOSITORY_TOKEN";