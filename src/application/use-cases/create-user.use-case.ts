import { Inject, Injectable } from "@nestjs/common";
import {
    HashedPassword,
    type Id,
    type IPasswordEncoder,
    type IUserRepository,
    PASSWORD_ENCODER_TOKEN,
    User,
    USER_REPOSITORY_TOKEN,
    UserExistsException
} from "../../domain/index.js";
import { IUseCase } from "./use-case.interface.js";

export interface CreateUserRequest {
    login: string;
    password: string;
    displayName: string | null;
}

export type CreateUserResponse = User;

@Injectable()
export class CreateUserUseCase implements IUseCase<CreateUserRequest, CreateUserResponse> {
    public constructor(
        @Inject(USER_REPOSITORY_TOKEN) private readonly repository: IUserRepository,
        @Inject(PASSWORD_ENCODER_TOKEN) private readonly passwordEncoder: IPasswordEncoder
    ) { }

    public async execute(payload: CreateUserRequest): Promise<CreateUserResponse> {
        const hasByLogin = await this.repository.existsByLogin(payload.login);
        if (hasByLogin) throw new UserExistsException();
        const hashedPassword = await HashedPassword.create(this.passwordEncoder, payload.password);
        const user = User.create(payload.login, hashedPassword, payload.displayName);
        await this.repository.save(user);
        return user;
    }
}