import { Inject, Injectable } from "@nestjs/common";
import { type IUseCase } from "./use-case.interface.js";
import { USER_REPOSITORY_TOKEN, type IUserRepository, type User } from "../../domain/index.js";

export interface GetUsersByTermRequest {
    term: string;
    limit: number;
    offset: number;
};

export type GetUsersByTermResponse = User[];

@Injectable()
export class GetUsersByTermUseCase implements IUseCase<GetUsersByTermRequest, GetUsersByTermResponse> {
    public constructor(@Inject(USER_REPOSITORY_TOKEN) private readonly repository: IUserRepository) { }

    public async execute(request: GetUsersByTermRequest): Promise<GetUsersByTermResponse> {
        return await this.repository.getByTerm(request.term, request.limit, request.offset);
    }
}