import { Inject, Injectable } from "@nestjs/common";
import { type IUseCase } from "./use-case.interface.js";
import {
    BadCredentialsException,
    PASSWORD_ENCODER_TOKEN,
    USER_REPOSITORY_TOKEN,
    type IPasswordEncoder,
    type IUserRepository,
    User
} from "../../domain/index.js";
export interface CheckCredentialsRequest {
    login: string;
    password: string;
}

export type CheckCredentialsResponse = User | null;

@Injectable()
export class CheckCredentialsUseCase implements IUseCase<CheckCredentialsRequest, CheckCredentialsResponse> {
    public constructor(
        @Inject(USER_REPOSITORY_TOKEN) private readonly repository: IUserRepository,
        @Inject(PASSWORD_ENCODER_TOKEN) private readonly encoder: IPasswordEncoder
    ) { }

    public async execute(request: CheckCredentialsRequest): Promise<CheckCredentialsResponse> {
        const user = await this.repository.getByLogin(request.login);
        if (user === null) throw new BadCredentialsException();
        const isPasswordCorrect = await user.verifyPassword(this.encoder, request.password);
        return isPasswordCorrect ? user : null;
    }
}