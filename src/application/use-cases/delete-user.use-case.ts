import { Inject, Injectable } from "@nestjs/common";
import { type IUseCase } from "./use-case.interface.js";
import { NotAdminException, USER_REPOSITORY_TOKEN, UserNotFoundException, type Id, type IUserRepository } from "../../domain/index.js";

export interface DeleteUserRequest {
    actorId: Id,
    userId: Id
};

export type DeleteUserResponse = void;

@Injectable()
export class DeleteUserUseCase implements IUseCase<DeleteUserRequest, DeleteUserResponse> {
    public constructor(
        @Inject(USER_REPOSITORY_TOKEN) private readonly repository: IUserRepository
    ) { }

    public async execute(request: DeleteUserRequest): Promise<void> {
        if (!request.actorId.equal(request.userId)) {
            const actor = await this.repository.getById(request.actorId);
            if (actor === null) throw new UserNotFoundException();
            if (!actor.isAdmin) throw new NotAdminException();
        }
        await this.repository.delete(request.userId);
    }
}