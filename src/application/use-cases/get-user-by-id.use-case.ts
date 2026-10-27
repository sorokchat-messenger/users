import { Inject, Injectable } from "@nestjs/common";
import { Id, type IUserRepository, User, USER_REPOSITORY_TOKEN } from "../../domain/index.js";

export interface GetUserByIdRequest {
    id: string;
}

export type GetUserByIdResponse = User | null;

@Injectable()
export class GetUserByIdUseCase {
    public constructor(@Inject(USER_REPOSITORY_TOKEN) private readonly repository: IUserRepository) { }

    public async execute(payload: GetUserByIdRequest): Promise<GetUserByIdResponse> {
        return await this.repository.getById(Id.restore(payload.id));
    }
}