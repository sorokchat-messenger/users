import { type UserDetails, type UserDetailsWithPassword } from "../contracts/index.js";

export interface IUserReadRepository {
    getById(id: string): Promise<UserDetails | null>;
    getByLoginWithPassword(login: string): Promise<UserDetailsWithPassword | null>;
    getByTerm(term: string, limit: number, offset: number): Promise<UserDetails[]>;
}

export const USER_READ_REPOSITORY_TOKEN: string = "USER_READ_REPOSITORY";