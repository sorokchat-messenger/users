import { type IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CheckCredentialsQuery } from "./query.js";
import { UserDetails } from "../../contracts/index.js";
import { USER_READ_REPOSITORY_TOKEN, type IUserReadRepository } from "../../ports/index.js";
import { Inject } from "@nestjs/common";
import { BadCredentialsException, type IPasswordEncoder, PASSWORD_ENCODER_TOKEN } from "../../../domain/index.js";
import { Role } from "@sorokchat-messenger/microservices";

@QueryHandler(CheckCredentialsQuery)
export class CheckCredentialsHandler implements IQueryHandler<CheckCredentialsQuery, UserDetails> {
    public constructor(
        @Inject(USER_READ_REPOSITORY_TOKEN)
        private readonly repository: IUserReadRepository,
        @Inject(PASSWORD_ENCODER_TOKEN)
        private readonly encoder: IPasswordEncoder
    ) { }

    public async execute(query: CheckCredentialsQuery): Promise<UserDetails> {
        const user = await this.repository.getByLoginWithPassword(query.login);
        if (user === null) throw new BadCredentialsException();
        const isPasswordValid = await this.encoder.verify(user.password, query.password);
        if (!isPasswordValid) throw new BadCredentialsException();
        return {
            id: user.id,
            login: user.login,
            displayName: user.displayName,
            role: user.role as Role
        }
    }
}