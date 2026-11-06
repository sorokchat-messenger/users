import { QueryHandler, type IQueryHandler } from "@nestjs/cqrs";
import { GetUserByTermQuery } from "./query.js";
import { type UserDetails } from "../../contracts/index.js";
import { USER_READ_REPOSITORY_TOKEN, type IUserReadRepository } from "../../ports/index.js";
import { Inject } from "@nestjs/common";

@QueryHandler(GetUserByTermQuery)
export class GetUserByTermHandler implements IQueryHandler<GetUserByTermQuery, UserDetails[]> {
    public constructor(
        @Inject(USER_READ_REPOSITORY_TOKEN)
        private readonly repository: IUserReadRepository
    ) { }

    public async execute(query: GetUserByTermQuery): Promise<UserDetails[]> {
        return await this.repository.getByTerm(query.term, query.limit, query.offset);
    }
}