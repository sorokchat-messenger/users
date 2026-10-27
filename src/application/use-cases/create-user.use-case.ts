import { Inject, Injectable } from "@nestjs/common";
import { type IUserRepository, User, USER_REPOSITORY_TOKEN } from "../../domain/index.js";

export interface CreateUserRequest {
    login: string;
    password: string;
    displayName: string | null;
}

export type CreateUserResponse = {
    id: string;
};

@Injectable()
export class CreateUserUseCase {
    public constructor(
        @Inject(USER_REPOSITORY_TOKEN) private readonly repository: IUserRepository
    ) { }

    public async execute(payload: CreateUserRequest): Promise<CreateUserResponse> {
        return { id: "" };
    }
}