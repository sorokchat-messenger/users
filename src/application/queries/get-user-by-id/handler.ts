import { QueryHandler, type IQueryHandler } from "@nestjs/cqrs";
import { GetUserByIdQuery } from "./query.js";
import { type UserDetails } from "../../contracts/index.js";
import { Inject } from "@nestjs/common";
import { type IUserReadRepository, USER_READ_REPOSITORY_TOKEN } from "../../ports/index.js";

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery, UserDetails | null> {
    public constructor(
        @Inject(USER_READ_REPOSITORY_TOKEN)
        private readonly repository: IUserReadRepository
    ) { }

    public async execute(query: GetUserByIdQuery): Promise<UserDetails | null> {
        return await this.repository.getById(query.id);
    }
}